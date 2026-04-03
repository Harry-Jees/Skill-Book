import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) throw new Error("Unauthorized");

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) throw new Error("Admin access required");

    const { topic, chapters = 7 } = await req.json();
    if (!topic || typeof topic !== "string" || topic.trim().length < 2) throw new Error("Valid topic is required");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are a course content creator. Generate a comprehensive skill book course. Return ONLY valid JSON with no markdown formatting, no code fences, no extra text.

The JSON must match this exact structure:
{
  "skill_name": "string",
  "description": "string (2-3 sentences)",
  "icon": "single emoji",
  "color": "hsl(h, s%, l%)",
  "category": "one of: Programming, Web Development, Data & AI, Design, Music, Photography & Video, Business, Languages, Science, Health & Fitness, Cooking, Crafts & DIY, Writing, Personal Development, Mathematics",
  "tutorials": [
    {
      "step_title": "string",
      "text": "string (3-4 paragraphs separated by \\n\\n, detailed educational content)",
      "youtube_search_queries": ["search query 1 for YouTube", "search query 2"],
      "wiki_links": [{"term": "string", "url": "https://en.wikipedia.org/wiki/..."}]
    }
  ]
}

CRITICAL RULES:
- Generate exactly ${chapters} chapters/tutorials
- Each chapter should have detailed, educational text (3-4 paragraphs minimum)
- For youtube_search_queries: provide 2-3 YouTube SEARCH QUERIES (not URLs!) that users can search to find relevant educational videos. Example: "python basics tutorial for beginners", "learn python variables and data types"
- Include 2-3 relevant Wikipedia links per chapter with REAL Wikipedia URLs
- Content should progress from beginner to advanced
- Make it practical with hands-on examples
- Do NOT include any YouTube URLs - only search queries`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Create a comprehensive course about: ${topic}` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    let content = aiData.choices?.[0]?.message?.content || "";
    
    // Strip markdown code fences if present
    content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    let courseData;
    try {
      courseData = JSON.parse(content);
    } catch {
      throw new Error("AI returned invalid JSON. Please try again.");
    }

    // Validate structure
    if (!courseData.skill_name || !courseData.tutorials || !Array.isArray(courseData.tutorials) || courseData.tutorials.length === 0) {
      throw new Error("AI returned incomplete course data. Please try again.");
    }

    // Convert youtube_search_queries to youtube_links (as search URLs)
    const sanitizedTutorials = courseData.tutorials.map((t: any, i: number) => {
      const queries = t.youtube_search_queries || t.youtube_links || [];
      const youtubeLinks = queries.map((q: string) => {
        // If it's already a youtube.com URL, convert to search
        if (q.includes("youtube.com/watch") || q.includes("youtu.be/")) {
          return null; // Skip direct URLs (likely hallucinated)
        }
        // If it looks like a search query, create a search URL
        const searchQuery = q.replace(/^https?:\/\/.*/, "").trim();
        if (searchQuery) {
          return `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
        }
        return null;
      }).filter(Boolean);

      return {
        step_title: t.step_title || `Chapter ${i + 1}`,
        text: t.text || "Content not available.",
        youtube_links: youtubeLinks.length > 0 ? youtubeLinks : [
          `https://www.youtube.com/results?search_query=${encodeURIComponent(courseData.skill_name + " " + (t.step_title || "tutorial"))}`
        ],
        wiki_links: (t.wiki_links || []).filter((w: any) => 
          w && w.term && w.url && w.url.startsWith("https://en.wikipedia.org/")
        ),
      };
    });

    // Save as draft
    const { data: saved, error: saveError } = await supabase
      .from("ai_skillbooks")
      .insert({
        skill_name: courseData.skill_name,
        description: courseData.description || `A comprehensive course about ${topic}.`,
        icon: courseData.icon || "📘",
        color: courseData.color || "hsl(200, 60%, 50%)",
        category: courseData.category || "Personal Development",
        tutorials: sanitizedTutorials,
        status: "draft",
        created_by: user.id,
      })
      .select()
      .single();

    if (saveError) throw saveError;

    return new Response(JSON.stringify({ success: true, course: saved }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-course error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
