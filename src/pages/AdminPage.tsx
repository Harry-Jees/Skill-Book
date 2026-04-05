import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { skillBooks } from "@/data/skillbooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import {
  ArrowLeft, Users, BookPlus, ClipboardList, Sparkles, Loader2, Trash2,
  Shield, ShieldCheck, Crown, Search, RefreshCw, CheckCircle2, X, BarChart3, Star, Flame, BookCheck, Calendar
} from "lucide-react";

interface UserRow {
  id: string;
  display_name: string | null;
  username: string | null;
  created_at: string;
  roles: string[];
  stars: number;
  currentStreak: number;
  longestStreak: number;
  courseStars: number;
  testStars: number;
  streakStars: number;
  completedCourses: number;
  progressDetails: { skill_id: string; completed_steps: number[]; completed_at: string | null }[];
  testResults: { skill_id: string; score: number; passed: boolean; test_number: number; completed_at: string }[];
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

const ADMIN_EMAIL = "harryjees@gmail.com";

const AdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [users, setUsers] = useState<UserRow[]>([]);
  const [drafts, setDrafts] = useState<AIDraft[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingDrafts, setLoadingDrafts] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState<"all" | "admin" | "active" | "inactive">("all");
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);

  const [topic, setTopic] = useState("");
  const [chapters, setChapters] = useState(7);
  const [generating, setGenerating] = useState(false);
  const [generatingTests, setGeneratingTests] = useState<string | null>(null);
  const [publishedAI, setPublishedAI] = useState<AIDraft[]>([]);

  const allCourses = [...skillBooks, ...publishedAI.map(ai => ({
    id: `ai-${ai.id}`, skill_name: ai.skill_name, tutorials: ai.tutorials || [],
  }))];

  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    const [{ data: profiles }, { data: roles }, { data: starsData }, { data: progressData }, { data: testData }, { data: testsRef }] = await Promise.all([
      supabase.from("profiles").select("id, display_name, username, created_at"),
      supabase.from("user_roles").select("user_id, role"),
      supabase.from("user_stars").select("user_id, total_stars, course_stars, test_stars, streak_stars, current_streak, longest_streak"),
      supabase.from("skill_progress").select("user_id, skill_id, completed_steps, completed_at"),
      supabase.from("test_results").select("user_id, skill_id, score, passed, test_id, completed_at"),
      supabase.from("skill_tests").select("id, test_number"),
    ]);

    const testNumberMap: Record<string, number> = {};
    (testsRef || []).forEach((t: any) => { testNumberMap[t.id] = t.test_number; });

    const mapped: UserRow[] = (profiles || []).map((p: any) => {
      const userRoles = (roles || []).filter((r: any) => r.user_id === p.id).map((r: any) => r.role);
      const userStars = (starsData || []).find((s: any) => s.user_id === p.id);
      const userProgress = (progressData || []).filter((pr: any) => pr.user_id === p.id);
      const completed = userProgress.filter((pr: any) => pr.completed_at).length;
      const userTests = (testData || []).filter((t: any) => t.user_id === p.id).map((t: any) => ({
        skill_id: t.skill_id,
        score: t.score,
        passed: t.passed,
        test_number: testNumberMap[t.test_id] || 0,
        completed_at: t.completed_at,
      }));

      return {
        id: p.id,
        display_name: p.display_name,
        username: p.username,
        created_at: p.created_at,
        roles: userRoles,
        stars: userStars?.total_stars || 0,
        courseStars: userStars?.course_stars || 0,
        testStars: userStars?.test_stars || 0,
        streakStars: userStars?.streak_stars || 0,
        currentStreak: userStars?.current_streak || 0,
        longestStreak: userStars?.longest_streak || 0,
        completedCourses: completed,
        progressDetails: userProgress.map((pr: any) => ({
          skill_id: pr.skill_id,
          completed_steps: pr.completed_steps || [],
          completed_at: pr.completed_at,
        })),
        testResults: userTests,
      };
    });
    setUsers(mapped);
    setLoadingUsers(false);
  }, []);

  const fetchDrafts = useCallback(async () => {
    setLoadingDrafts(true);
    const { data } = await supabase.from("ai_skillbooks").select("*").order("created_at", { ascending: false });
    const all = (data as AIDraft[]) || [];
    setDrafts(all);
    setPublishedAI(all.filter(d => d.status === "published"));
    setLoadingDrafts(false);
  }, []);

  useEffect(() => { fetchUsers(); fetchDrafts(); }, [fetchUsers, fetchDrafts]);

  const toggleRole = async (userId: string, role: string, hasRole: boolean) => {
    if (hasRole) {
      await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role as any);
    } else {
      await supabase.from("user_roles").insert({ user_id: userId, role: role as any });
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
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.session?.access_token}` },
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

  const generateAllTests = async (skillId: string, skillName: string) => {
    setGeneratingTests(skillId);
    try {
      const { data: session } = await supabase.auth.getSession();
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-test`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.session?.access_token}` },
        body: JSON.stringify({ skill_id: skillId, skill_name: skillName, generate_all: true }),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      toast({ title: "✅ Tests generated!", description: `${result.count} tests created for "${skillName}".` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setGeneratingTests(null);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = !userSearch || u.display_name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.username?.toLowerCase().includes(userSearch.toLowerCase()) || u.id.includes(userSearch);
    if (!matchesSearch) return false;
    if (searchFilter === "admin") return u.roles.includes("admin");
    if (searchFilter === "active") return u.stars > 0 || u.completedCourses > 0;
    if (searchFilter === "inactive") return u.stars === 0 && u.completedCourses === 0;
    return true;
  });

  const roleIcon = (role: string) => {
    if (role === "admin") return <Crown className="w-3 h-3" />;
    if (role === "moderator") return <ShieldCheck className="w-3 h-3" />;
    return <Shield className="w-3 h-3" />;
  };

  const getCourseName = (skillId: string) => {
    const course = allCourses.find(c => c.id === skillId);
    return course?.skill_name || skillId;
  };

  const getCourseChapterCount = (skillId: string) => {
    const course = allCourses.find(c => c.id === skillId);
    return course?.tutorials?.length || 0;
  };

  // User detail modal
  const renderUserDetail = () => {
    if (!selectedUser) return null;
    const u = selectedUser;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setSelectedUser(null)}>
        <div className="bg-card rounded-2xl border border-border shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-fade-in" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card rounded-t-2xl z-10">
            <div>
              <h2 className="text-xl font-display font-bold">{u.display_name || "Unknown User"}</h2>
              <p className="text-sm text-muted-foreground font-body">@{u.username || "no username"} • Joined {new Date(u.created_at).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2">
              {u.roles.map(r => (
                <Badge key={r} variant={r === "admin" ? "default" : "secondary"} className="text-xs gap-1">{roleIcon(r)} {r}</Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}><X className="w-4 h-4" /></Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Stars overview */}
            <div>
              <h3 className="text-sm font-body font-semibold text-muted-foreground uppercase tracking-wider mb-3">Stars Breakdown</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total", value: u.stars, icon: Star, color: "text-secondary" },
                  { label: "Courses", value: u.courseStars, icon: BookCheck, color: "text-blue-500" },
                  { label: "Tests", value: u.testStars, icon: ClipboardList, color: "text-green-500" },
                  { label: "Streaks", value: u.streakStars, icon: Flame, color: "text-orange-500" },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="bg-muted/30 rounded-xl p-3 text-center">
                    <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
                    <p className="text-lg font-display font-bold">{value}</p>
                    <p className="text-[10px] text-muted-foreground font-body">{label}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-3 text-xs font-body text-muted-foreground">
                <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-500" /> Current streak: {u.currentStreak}d</span>
                <span>Longest: {u.longestStreak}d</span>
              </div>
            </div>

            {/* Course Progress */}
            <div>
              <h3 className="text-sm font-body font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Course Progress ({u.completedCourses} completed)
              </h3>
              {u.progressDetails.length === 0 ? (
                <p className="text-sm text-muted-foreground font-body">No course progress yet.</p>
              ) : (
                <div className="space-y-2">
                  {u.progressDetails.map(pd => {
                    const totalChapters = getCourseChapterCount(pd.skill_id);
                    const pct = totalChapters > 0 ? Math.round((pd.completed_steps.length / totalChapters) * 100) : 0;
                    return (
                      <div key={pd.skill_id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-body font-medium truncate">{getCourseName(pd.skill_id)}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={pct} className="h-1.5 flex-1" />
                            <span className="text-xs font-body text-muted-foreground">{pd.completed_steps.length}/{totalChapters}</span>
                          </div>
                        </div>
                        {pd.completed_at && <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Test Results */}
            <div>
              <h3 className="text-sm font-body font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Test Results ({u.testResults.length} taken)
              </h3>
              {u.testResults.length === 0 ? (
                <p className="text-sm text-muted-foreground font-body">No tests taken yet.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {u.testResults.map((tr, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${tr.passed ? "bg-secondary/5" : "bg-destructive/5"}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        tr.passed ? "bg-secondary/20 text-secondary" : "bg-destructive/20 text-destructive"
                      }`}>
                        {tr.score}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-body font-medium truncate">{getCourseName(tr.skill_id)}</p>
                        <p className="text-xs text-muted-foreground font-body">Test {tr.test_number} • {tr.passed ? "Passed" : "Failed"}</p>
                      </div>
                      <div className="text-xs text-muted-foreground font-body flex items-center gap-1 shrink-0">
                        <Calendar className="w-3 h-3" />
                        {new Date(tr.completed_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        {renderUserDetail()}

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
            <TabsList className="mb-6 flex-wrap">
              <TabsTrigger value="users" className="gap-2 font-body"><Users className="w-4 h-4" /> Users ({users.length})</TabsTrigger>
              <TabsTrigger value="ai-courses" className="gap-2 font-body"><Sparkles className="w-4 h-4" /> AI Courses</TabsTrigger>
              <TabsTrigger value="drafts" className="gap-2 font-body"><BookPlus className="w-4 h-4" /> Drafts</TabsTrigger>
              <TabsTrigger value="tests" className="gap-2 font-body"><ClipboardList className="w-4 h-4" /> Tests</TabsTrigger>
            </TabsList>

            {/* USERS TAB */}
            <TabsContent value="users" className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search by name, username, or ID..." value={userSearch} onChange={e => setUserSearch(e.target.value)} className="pl-10 font-body" />
                </div>
                <div className="flex gap-1">
                  {(["all", "admin", "active", "inactive"] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setSearchFilter(f)}
                      className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all ${
                        searchFilter === f ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={fetchUsers} className="font-body gap-2">
                  <RefreshCw className="w-4 h-4" /> Refresh
                </Button>
                <span className="text-xs text-muted-foreground font-body">{filteredUsers.length} users</span>
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
                          <th className="text-left p-4 font-medium">Username</th>
                          <th className="text-left p-4 font-medium">Roles</th>
                          <th className="text-center p-4 font-medium">⭐</th>
                          <th className="text-center p-4 font-medium">📚</th>
                          <th className="text-center p-4 font-medium">🔥</th>
                          <th className="text-left p-4 font-medium">Joined</th>
                          <th className="text-center p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(u => (
                          <tr
                            key={u.id}
                            className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                            onClick={() => setSelectedUser(u)}
                          >
                            <td className="p-4">
                              <p className="font-medium">{u.display_name || "—"}</p>
                              <p className="text-xs text-muted-foreground">{u.id.slice(0, 8)}...</p>
                            </td>
                            <td className="p-4 text-xs text-muted-foreground">@{u.username || "—"}</td>
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
                            <td className="p-4 text-center">{u.currentStreak}</td>
                            <td className="p-4 text-xs text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
                            <td className="p-4" onClick={e => e.stopPropagation()}>
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
                    Enter a topic and AI will generate a complete skill book with chapters, notes, and YouTube search references.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-body font-medium mb-1.5 block">Topic</label>
                    <Input placeholder="e.g. Machine Learning with Python, Watercolor Painting..." value={topic} onChange={e => setTopic(e.target.value)} className="font-body" />
                  </div>
                  <div>
                    <label className="text-sm font-body font-medium mb-1.5 block">Number of Chapters</label>
                    <Input type="number" min={3} max={15} value={chapters} onChange={e => setChapters(Number(e.target.value))} className="font-body w-32" />
                  </div>
                  <Button onClick={generateCourse} disabled={generating || !topic.trim()} className="bg-secondary text-secondary-foreground font-body gap-2">
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
                    <ClipboardList className="w-5 h-5 text-secondary" /> Generate Tests for Courses
                  </h2>
                  <p className="text-sm text-muted-foreground font-body mt-1">
                    Generate all 10 tests (10 MCQs each) for a course in one click.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-body font-semibold">Static Courses</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {skillBooks.map(book => (
                      <div key={book.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                        <span className="text-2xl">{book.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-body font-medium truncate">{book.skill_name}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="font-body text-xs shrink-0"
                          disabled={generatingTests === book.id}
                          onClick={() => generateAllTests(book.id, book.skill_name)}
                        >
                          {generatingTests === book.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Generate 10"}
                        </Button>
                      </div>
                    ))}
                  </div>

                  {publishedAI.length > 0 && (
                    <>
                      <h3 className="text-sm font-body font-semibold mt-4">AI Courses</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {publishedAI.map(ai => {
                          const skillId = `ai-${ai.id}`;
                          return (
                            <div key={ai.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                              <span className="text-2xl">{ai.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-body font-medium truncate">{ai.skill_name}</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="font-body text-xs shrink-0"
                                disabled={generatingTests === skillId}
                                onClick={() => generateAllTests(skillId, ai.skill_name)}
                              >
                                {generatingTests === skillId ? <Loader2 className="w-3 h-3 animate-spin" /> : "Generate 10"}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
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
