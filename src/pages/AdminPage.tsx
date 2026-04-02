import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import {
  ArrowLeft, Users, BookPlus, ClipboardList, Sparkles, Loader2, Trash2,
  Shield, ShieldCheck, Crown, Search, Eye, RefreshCw, CheckCircle2, XCircle
} from "lucide-react";

interface UserRow {
  id: string;
  display_name: string | null;
  created_at: string;
  roles: string[];
  stars: number;
  completedCourses: number;
}

interface AIDraft {
  id: string;
  skill_name: string;
  description: string;
  icon: string;
  category: string;
  status: string;
  tutorials: any[];
  created_at: string;
}

const AdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [users, setUsers] = useState<UserRow[]>([]);
  const [drafts, setDrafts] = useState<AIDraft[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingDrafts, setLoadingDrafts] = useState(true);
  const [userSearch, setUserSearch] = useState("");

  // AI generation
  const [topic, setTopic] = useState("");
  const [chapters, setChapters] = useState(7);
  const [generating, setGenerating] = useState(false);

  // Test generation
  const [testSkillId, setTestSkillId] = useState("");
  const [testSkillName, setTestSkillName] = useState("");
  const [generatingTest, setGeneratingTest] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    const { data: profiles } = await supabase.from("profiles").select("id, display_name, created_at");
    const { data: roles } = await supabase.from("user_roles").select("user_id, role");
    const { data: stars } = await supabase.from("user_stars").select("user_id, total_stars");
    const { data: progress } = await supabase.from("skill_progress").select("user_id, completed_at");

    const mapped: UserRow[] = (profiles || []).map((p: any) => {
      const userRoles = (roles || []).filter((r: any) => r.user_id === p.id).map((r: any) => r.role);
      const userStars = (stars || []).find((s: any) => s.user_id === p.id);
      const completed = (progress || []).filter((pr: any) => pr.user_id === p.id && pr.completed_at).length;
      return {
        id: p.id,
        display_name: p.display_name,
        created_at: p.created_at,
        roles: userRoles,
        stars: userStars?.total_stars || 0,
        completedCourses: completed,
      };
    });
    setUsers(mapped);
    setLoadingUsers(false);
  }, []);

  const fetchDrafts = useCallback(async () => {
    setLoadingDrafts(true);
    const { data } = await supabase
      .from("ai_skillbooks")
      .select("*")
      .order("created_at", { ascending: false });
    setDrafts((data as AIDraft[]) || []);
    setLoadingDrafts(false);
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchDrafts();
  }, [fetchUsers, fetchDrafts]);

  const toggleRole = async (userId: string, role: string, hasRole: boolean) => {
    if (hasRole) {
      await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role);
    } else {
      await supabase.from("user_roles").insert({ user_id: userId, role });
    }
    toast({ title: hasRole ? "Role removed" : "Role assigned" });
    fetchUsers();
  };

  const generateCourse = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.session?.access_token}`,
        },
        body: JSON.stringify({ topic, chapters }),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      toast({ title: "✨ Course generated!", description: `"${result.course.skill_name}" saved as draft.` });
      setTopic("");
      fetchDrafts();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setGenerating(false);
  };

  const publishDraft = async (id: string) => {
    await supabase.from("ai_skillbooks").update({ status: "published" }).eq("id", id);
    toast({ title: "Published!" });
    fetchDrafts();
  };

  const deleteDraft = async (id: string) => {
    await supabase.from("ai_skillbooks").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchDrafts();
  };

  const generateTest = async () => {
    if (!testSkillId.trim() || !testSkillName.trim()) return;
    setGeneratingTest(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.session?.access_token}`,
        },
        body: JSON.stringify({ skill_id: testSkillId, skill_name: testSkillName }),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      toast({ title: "✅ Test generated!", description: `10 MCQ questions created for "${testSkillName}".` });
      setTestSkillId("");
      setTestSkillName("");
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setGeneratingTest(false);
  };

  const filteredUsers = users.filter(u =>
    !userSearch || u.display_name?.toLowerCase().includes(userSearch.toLowerCase()) || u.id.includes(userSearch)
  );

  const roleIcon = (role: string) => {
    if (role === "admin") return <Crown className="w-3 h-3" />;
    if (role === "moderator") return <ShieldCheck className="w-3 h-3" />;
    return <Shield className="w-3 h-3" />;
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2 font-body">
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </Button>
            <h1 className="text-lg font-display font-bold">Admin Dashboard</h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <Tabs defaultValue="users">
            <TabsList className="mb-6">
              <TabsTrigger value="users" className="gap-2 font-body"><Users className="w-4 h-4" /> Users</TabsTrigger>
              <TabsTrigger value="ai-courses" className="gap-2 font-body"><Sparkles className="w-4 h-4" /> AI Courses</TabsTrigger>
              <TabsTrigger value="drafts" className="gap-2 font-body"><BookPlus className="w-4 h-4" /> Drafts</TabsTrigger>
              <TabsTrigger value="tests" className="gap-2 font-body"><ClipboardList className="w-4 h-4" /> Tests</TabsTrigger>
            </TabsList>

            {/* USERS TAB */}
            <TabsContent value="users" className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search users..." value={userSearch} onChange={e => setUserSearch(e.target.value)} className="pl-10 font-body" />
                </div>
                <Button variant="outline" size="sm" onClick={fetchUsers} className="font-body gap-2">
                  <RefreshCw className="w-4 h-4" /> Refresh
                </Button>
              </div>

              {loadingUsers ? (
                <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin" /></div>
              ) : (
                <div className="bg-card rounded-2xl border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm font-body">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="text-left p-4 font-medium">User</th>
                          <th className="text-left p-4 font-medium">Roles</th>
                          <th className="text-center p-4 font-medium">⭐ Stars</th>
                          <th className="text-center p-4 font-medium">📚 Courses</th>
                          <th className="text-left p-4 font-medium">Joined</th>
                          <th className="text-center p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(u => (
                          <tr key={u.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="p-4">
                              <p className="font-medium">{u.display_name || "—"}</p>
                              <p className="text-xs text-muted-foreground">{u.id.slice(0, 8)}...</p>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-1 flex-wrap">
                                {u.roles.map(r => (
                                  <Badge key={r} variant={r === "admin" ? "default" : "secondary"} className="text-xs gap-1">
                                    {roleIcon(r)} {r}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 text-center font-medium">{u.stars}</td>
                            <td className="p-4 text-center">{u.completedCourses}</td>
                            <td className="p-4 text-xs text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
                            <td className="p-4">
                              <div className="flex gap-1 justify-center">
                                {(["admin", "moderator"] as const).map(role => (
                                  <Button
                                    key={role}
                                    variant={u.roles.includes(role) ? "default" : "outline"}
                                    size="sm"
                                    className="text-xs h-7 font-body"
                                    onClick={() => toggleRole(u.id, role, u.roles.includes(role))}
                                  >
                                    {role === "admin" ? "Admin" : "Mod"}
                                  </Button>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* AI COURSES TAB */}
            <TabsContent value="ai-courses" className="space-y-6">
              <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-display font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-secondary" /> AI Course Generator
                  </h2>
                  <p className="text-sm text-muted-foreground font-body mt-1">
                    Enter a topic and AI will generate a complete skill book with chapters, notes, videos, and references.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-body font-medium mb-1.5 block">Topic</label>
                    <Input
                      placeholder="e.g. Machine Learning with Python, Watercolor Painting, Public Speaking..."
                      value={topic}
                      onChange={e => setTopic(e.target.value)}
                      className="font-body"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-body font-medium mb-1.5 block">Number of Chapters</label>
                    <Input
                      type="number"
                      min={3}
                      max={15}
                      value={chapters}
                      onChange={e => setChapters(Number(e.target.value))}
                      className="font-body w-32"
                    />
                  </div>
                  <Button
                    onClick={generateCourse}
                    disabled={generating || !topic.trim()}
                    className="bg-secondary text-secondary-foreground font-body gap-2"
                  >
                    {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {generating ? "Generating..." : "Generate Course"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* DRAFTS TAB */}
            <TabsContent value="drafts" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-display font-bold">Course Drafts & Published</h2>
                <Button variant="outline" size="sm" onClick={fetchDrafts} className="font-body gap-2">
                  <RefreshCw className="w-4 h-4" /> Refresh
                </Button>
              </div>

              {loadingDrafts ? (
                <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin" /></div>
              ) : drafts.length === 0 ? (
                <p className="text-center py-12 text-muted-foreground font-body">No AI-generated courses yet.</p>
              ) : (
                <div className="grid gap-4">
                  {drafts.map(d => (
                    <div key={d.id} className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
                      <span className="text-3xl">{d.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-display font-semibold truncate">{d.skill_name}</h3>
                          <Badge variant={d.status === "published" ? "default" : "secondary"} className="text-xs">
                            {d.status === "published" ? <><CheckCircle2 className="w-3 h-3 mr-1" />Published</> : "Draft"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground font-body line-clamp-1">{d.description}</p>
                        <p className="text-xs text-muted-foreground font-body mt-1">{d.tutorials?.length || 0} chapters • {d.category}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {d.status === "draft" && (
                          <Button size="sm" onClick={() => publishDraft(d.id)} className="bg-secondary text-secondary-foreground font-body text-xs">
                            Publish
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => deleteDraft(d.id)} className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* TESTS TAB */}
            <TabsContent value="tests" className="space-y-6">
              <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-display font-bold flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-secondary" /> Generate Test
                  </h2>
                  <p className="text-sm text-muted-foreground font-body mt-1">
                    Generate 10 AI-powered MCQ questions for any skill.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-body font-medium mb-1.5 block">Skill ID</label>
                    <Input placeholder="e.g. python, javascript, react..." value={testSkillId} onChange={e => setTestSkillId(e.target.value)} className="font-body" />
                  </div>
                  <div>
                    <label className="text-sm font-body font-medium mb-1.5 block">Skill Name</label>
                    <Input placeholder="e.g. Python Programming" value={testSkillName} onChange={e => setTestSkillName(e.target.value)} className="font-body" />
                  </div>
                  <Button
                    onClick={generateTest}
                    disabled={generatingTest || !testSkillId.trim() || !testSkillName.trim()}
                    className="bg-secondary text-secondary-foreground font-body gap-2"
                  >
                    {generatingTest ? <Loader2 className="w-4 h-4 animate-spin" /> : <ClipboardList className="w-4 h-4" />}
                    {generatingTest ? "Generating..." : "Generate Test"}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </PageTransition>
  );
};

export default AdminPage;
