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

    const { skill_id, skill_name, test_number = 1, generate_all = false } = await req.json();
    if (!skill_id || !skill_name) throw new Error("skill_id and skill_name required");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const testsToGenerate = generate_all ? 10 : 1;
    const startNumber = generate_all ? 1 : test_number;
    const results = [];

    for (let t = 0; t < testsToGenerate; t++) {
      const currentTestNumber = startNumber + t;
      
      const systemPrompt = `Generate exactly 10 multiple-choice questions for a quiz about "${skill_name}" (Test ${currentTestNumber} of 10). Return ONLY valid JSON array with no markdown, no code fences, no extra text.

Each question format:
[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "correct": 0,
    "explanation": "Brief explanation"
  }
]

Rules:
- Exactly 10 questions, 4 options each
- "correct" is 0-based index
- Test ${currentTestNumber}: ${currentTestNumber <= 3 ? "Focus on fundamentals" : currentTestNumber <= 6 ? "Focus on intermediate concepts" : "Focus on advanced topics"}
- Mix difficulty: 3 easy, 4 medium, 3 hard
- Questions should test practical understanding
- Each test must have DIFFERENT questions from other tests`;

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
            { role: "user", content: `Create test #${currentTestNumber} for: ${skill_name}` },
          ],
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          // If rate limited during batch, return what we have so far
          if (results.length > 0) break;
          return new Response(JSON.stringify({ error: "Rate limited. Try again shortly." }), {
            status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        throw new Error("AI gateway error");
      }

      const aiData = await response.json();
      let content = aiData.choices?.[0]?.message?.content || "";
      content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      
      let questions;
      try {
        questions = JSON.parse(content);
      } catch {
        console.error(`Failed to parse test ${currentTestNumber}`);
        continue; // Skip this test and try the next
      }

      // Validate questions
      if (!Array.isArray(questions) || questions.length < 5) continue;
      
      const validQuestions = questions.filter((q: any) => 
        q && q.question && Array.isArray(q.options) && q.options.length === 4 && 
        typeof q.correct === "number" && q.correct >= 0 && q.correct <= 3
      ).slice(0, 10);

      if (validQuestions.length < 5) continue;

      const { data: saved, error: saveError } = await supabase
        .from("skill_tests")
        .upsert({
          skill_id,
          test_number: currentTestNumber,
          questions: validQuestions,
          created_by: user.id,
        }, { onConflict: "skill_id,test_number" })
        .select()
        .single();

      if (!saveError && saved) results.push(saved);

      // Small delay between requests to avoid rate limiting
      if (generate_all && t < testsToGenerate - 1) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    return new Response(JSON.stringify({ success: true, tests: results, count: results.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-test error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
