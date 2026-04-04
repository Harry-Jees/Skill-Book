import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import {
  ArrowLeft, Star, Flame, BookCheck, ClipboardList, Calendar, Edit3, Save, X, Lock, Mail,
} from "lucide-react";

interface TestHistoryItem {
  skill_id: string;
  test_number: number;
  score: number;
  passed: boolean;
  completed_at: string;
  skill_name?: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, stars, refreshStars } = useAuth();
  const { toast } = useToast();

  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "");
  const [usernameError, setUsernameError] = useState("");
  const [savingUsername, setSavingUsername] = useState(false);

  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [savingEmail, setSavingEmail] = useState(false);

  const [changingPassword, setChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const [testHistory, setTestHistory] = useState<TestHistoryItem[]>([]);
  const [aiSkillNames, setAiSkillNames] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;
    const fetchHistory = async () => {
      const { data: results } = await supabase
        .from("test_results")
        .select("skill_id, score, passed, completed_at, test_id")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false });

      if (!results) return;

      const testIds = results.map((r: any) => r.test_id);
      const { data: tests } = await supabase.from("skill_tests").select("id, test_number").in("id", testIds);
      const testNumMap: Record<string, number> = {};
      (tests || []).forEach((t: any) => { testNumMap[t.id] = t.test_number; });

      // Fetch AI skillbook names
      const { data: aiBooks } = await supabase.from("ai_skillbooks").select("id, skill_name").eq("status", "published");
      const nameMap: Record<string, string> = {};
      (aiBooks || []).forEach((b: any) => { nameMap[`ai-${b.id}`] = b.skill_name; });
      setAiSkillNames(nameMap);

      setTestHistory(results.map((r: any) => ({
        skill_id: r.skill_id,
        test_number: testNumMap[r.test_id] || 0,
        score: r.score,
        passed: r.passed,
        completed_at: r.completed_at,
      })));
    };
    fetchHistory();
  }, [user]);

  const saveUsername = async () => {
    const trimmed = newUsername.trim();
    if (trimmed.length < 3) { setUsernameError("Min 3 characters"); return; }
    if (trimmed.length > 20) { setUsernameError("Max 20 characters"); return; }
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) { setUsernameError("Only letters, numbers, underscores"); return; }

    setSavingUsername(true);
    setUsernameError("");
    const { error } = await supabase.from("profiles").update({ username: trimmed, display_name: trimmed }).eq("id", user!.id);
    if (error) {
      setUsernameError(error.message.includes("unique") || error.message.includes("duplicate") ? "Username already taken" : error.message);
    } else {
      toast({ title: "Username updated!" });
      setEditingUsername(false);
      // Refresh page to pick up changes
      window.location.reload();
    }
    setSavingUsername(false);
  };

  const saveEmail = async () => {
    if (!newEmail.includes("@")) return;
    setSavingEmail(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "Confirm the change via both old and new email." });
      setEditingEmail(false);
    }
    setSavingEmail(false);
  };

  const savePassword = async () => {
    if (newPassword.length < 6) { toast({ title: "Password too short", variant: "destructive" }); return; }
    if (newPassword !== confirmPassword) { toast({ title: "Passwords don't match", variant: "destructive" }); return; }
    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password updated!" });
      setChangingPassword(false);
      setNewPassword("");
      setConfirmPassword("");
    }
    setSavingPassword(false);
  };

  // Streak calendar - last 30 days
  const streakDays = useMemo(() => {
    const days: { date: string; active: boolean }[] = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      // We show the last_login_date chain
      const streakStart = new Date(today);
      streakStart.setDate(streakStart.getDate() - (stars.current_streak - 1));
      const active = d >= streakStart && d <= today && stars.current_streak > 0;
      days.push({ date: dateStr, active });
    }
    return days;
  }, [stars.current_streak]);

  const getSkillName = (skillId: string) => {
    if (aiSkillNames[skillId]) return aiSkillNames[skillId];
    return skillId;
  };

  if (!user) return null;

  return (
    <PageTransition>
      <div className="min-h-screen">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2 font-body">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-lg font-display font-bold">My Profile</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {/* Profile Info */}
          <div className="bg-card rounded-2xl border border-border shadow-card p-6 space-y-5 animate-fade-in">
            <h2 className="text-xl font-display font-bold">Account</h2>

            {/* Username */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label className="font-body text-xs text-muted-foreground">Username</Label>
                {editingUsername ? (
                  <div className="flex items-center gap-2 mt-1">
                    <Input value={newUsername} onChange={e => { setNewUsername(e.target.value); setUsernameError(""); }} className="font-body max-w-xs" />
                    <Button size="sm" onClick={saveUsername} disabled={savingUsername} className="bg-secondary text-secondary-foreground"><Save className="w-4 h-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingUsername(false)}><X className="w-4 h-4" /></Button>
                  </div>
                ) : (
                  <p className="font-body font-medium">@{user.username || "not set"}</p>
                )}
                {usernameError && <p className="text-xs text-destructive font-body mt-1">{usernameError}</p>}
              </div>
              {!editingUsername && (
                <Button variant="ghost" size="sm" onClick={() => { setEditingUsername(true); setNewUsername(user.username || ""); }}>
                  <Edit3 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label className="font-body text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> Email</Label>
                {editingEmail ? (
                  <div className="flex items-center gap-2 mt-1">
                    <Input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="font-body max-w-xs" />
                    <Button size="sm" onClick={saveEmail} disabled={savingEmail} className="bg-secondary text-secondary-foreground"><Save className="w-4 h-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingEmail(false)}><X className="w-4 h-4" /></Button>
                  </div>
                ) : (
                  <p className="font-body font-medium">{user.email}</p>
                )}
              </div>
              {!editingEmail && (
                <Button variant="ghost" size="sm" onClick={() => { setEditingEmail(true); setNewEmail(user.email); }}>
                  <Edit3 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Password */}
            <div>
              <Label className="font-body text-xs text-muted-foreground flex items-center gap-1"><Lock className="w-3 h-3" /> Password</Label>
              {changingPassword ? (
                <div className="space-y-2 mt-1 max-w-xs">
                  <Input type="password" placeholder="New password (min 6)" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="font-body" />
                  <Input type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="font-body" />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={savePassword} disabled={savingPassword} className="bg-secondary text-secondary-foreground font-body">Update Password</Button>
                    <Button size="sm" variant="ghost" onClick={() => setChangingPassword(false)} className="font-body">Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-body text-muted-foreground">••••••••</p>
                  <Button variant="ghost" size="sm" onClick={() => setChangingPassword(true)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Stars Breakdown */}
          <div className="bg-card rounded-2xl border border-border shadow-card p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-secondary" /> Star Breakdown
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Total", value: stars.total_stars, icon: Star, color: "text-secondary" },
                { label: "Courses", value: stars.course_stars, icon: BookCheck, color: "text-blue-500" },
                { label: "Tests", value: stars.test_stars, icon: ClipboardList, color: "text-green-500" },
                { label: "Streaks", value: stars.streak_stars, icon: Flame, color: "text-orange-500" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-muted/30 rounded-xl p-4 text-center">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
                  <p className="text-2xl font-display font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground font-body">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Streak Calendar */}
          <div className="bg-card rounded-2xl border border-border shadow-card p-6 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <h2 className="text-xl font-display font-bold mb-2 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" /> Streak Calendar
            </h2>
            <p className="text-sm text-muted-foreground font-body mb-4">
              Current streak: <span className="font-semibold text-foreground">{stars.current_streak} days</span> • Longest: <span className="font-semibold text-foreground">{stars.longest_streak} days</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {streakDays.map(d => (
                <div
                  key={d.date}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-body transition-all ${
                    d.active ? "bg-secondary/20 text-secondary font-semibold border border-secondary/30" : "bg-muted text-muted-foreground"
                  }`}
                  title={d.date}
                >
                  {new Date(d.date + "T12:00:00").getDate()}
                </div>
              ))}
            </div>
          </div>

          {/* Test History */}
          <div className="bg-card rounded-2xl border border-border shadow-card p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-secondary" /> Test History
            </h2>
            {testHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground font-body">No tests taken yet.</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {testHistory.map((t, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${t.passed ? "bg-secondary/5" : "bg-destructive/5"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      t.passed ? "bg-secondary/20 text-secondary" : "bg-destructive/20 text-destructive"
                    }`}>
                      {t.score}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body font-medium truncate">{getSkillName(t.skill_id)}</p>
                      <p className="text-xs text-muted-foreground font-body">Test {t.test_number} • {t.passed ? "Passed" : "Failed"}</p>
                    </div>
                    <div className="text-xs text-muted-foreground font-body flex items-center gap-1 shrink-0">
                      <Calendar className="w-3 h-3" />
                      {new Date(t.completed_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default ProfilePage;
