import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  username: string | null;
}

interface StarsData {
  total_stars: number;
  course_stars: number;
  test_stars: number;
  streak_stars: number;
  current_streak: number;
  longest_streak: number;
  last_login_date: string | null;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  progress: Record<string, { completedSteps: number[]; startedAt: string; completedAt?: string }>;
  isAdmin: boolean;
  stars: StarsData;
  targets: string[];
  needsUsername: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (email: string, password: string, name: string) => Promise<string | null>;
  logout: () => Promise<void>;
  toggleStep: (skillId: string, stepIndex: number, totalSteps: number) => void;
  getSkillProgress: (skillId: string, totalSteps: number) => number;
  isSkillCompleted: (skillId: string, totalSteps: number) => boolean;
  getCompletedSkills: () => string[];
  refreshStars: () => Promise<void>;
  addTarget: (skillId: string) => Promise<void>;
  removeTarget: (skillId: string) => Promise<void>;
  setUsernameComplete: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const defaultStars: StarsData = { total_stars: 0, course_stars: 0, test_stars: 0, streak_stars: 0, current_streak: 0, longest_streak: 0, last_login_date: null };

function mapProfile(supabaseUser: SupabaseUser, displayName?: string, username?: string | null): UserProfile {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || "",
    displayName: displayName || supabaseUser.user_metadata?.display_name || supabaseUser.email?.split("@")[0] || "User",
    username: username || null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<Record<string, { completedSteps: number[]; startedAt: string; completedAt?: string }>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [stars, setStars] = useState<StarsData>(defaultStars);
  const [targets, setTargets] = useState<string[]>([]);
  const [needsUsername, setNeedsUsername] = useState(false);

  const fetchProgress = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("skill_progress")
      .select("skill_id, completed_steps, started_at, completed_at")
      .eq("user_id", userId);
    if (data) {
      const mapped: typeof progress = {};
      data.forEach((row: any) => {
        mapped[row.skill_id] = {
          completedSteps: row.completed_steps || [],
          startedAt: row.started_at,
          completedAt: row.completed_at || undefined,
        };
      });
      setProgress(mapped);
    }
  }, []);

  const fetchProfile = useCallback(async (supabaseUser: SupabaseUser) => {
    const { data } = await supabase
      .from("profiles")
      .select("display_name, username")
      .eq("id", supabaseUser.id)
      .single();
    setUser(mapProfile(supabaseUser, data?.display_name || undefined, data?.username));
    setNeedsUsername(!data?.username);
  }, []);

  const fetchRole = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .single();
    setIsAdmin(!!data);
  }, []);

  const fetchStars = useCallback(async (userId: string) => {
    const { data } = await supabase.from("user_stars").select("*").eq("user_id", userId).single();
    if (data) {
      setStars({
        total_stars: data.total_stars, course_stars: data.course_stars,
        test_stars: data.test_stars, streak_stars: data.streak_stars,
        current_streak: data.current_streak, longest_streak: data.longest_streak,
        last_login_date: data.last_login_date,
      });
    } else {
      setStars(defaultStars);
    }
  }, []);

  const fetchTargets = useCallback(async (userId: string) => {
    const { data } = await supabase.from("user_targets").select("skill_id").eq("user_id", userId);
    setTargets((data || []).map((t: any) => t.skill_id));
  }, []);

  const refreshStars = useCallback(async () => {
    if (user) await fetchStars(user.id);
  }, [user, fetchStars]);

  const updateStreak = useCallback(async (userId: string) => {
    const today = new Date().toISOString().split("T")[0];
    const { data: existing } = await supabase.from("user_stars").select("*").eq("user_id", userId).single();

    if (!existing) {
      await supabase.from("user_stars").insert({ user_id: userId, current_streak: 1, longest_streak: 1, streak_stars: 1, total_stars: 1, last_login_date: today });
      return;
    }
    if (existing.last_login_date === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    let newStreak = existing.last_login_date === yesterdayStr ? (existing.current_streak || 0) + 1 : 1;
    const streakBonus = newStreak % 7 === 0 ? 3 : newStreak % 3 === 0 ? 2 : 1;

    await supabase.from("user_stars").update({
      current_streak: newStreak,
      longest_streak: Math.max(existing.longest_streak || 0, newStreak),
      streak_stars: (existing.streak_stars || 0) + streakBonus,
      total_stars: (existing.total_stars || 0) + streakBonus,
      last_login_date: today,
    }).eq("user_id", userId);
  }, []);

  useEffect(() => {
    const initUser = async (supabaseUser: SupabaseUser) => {
      await Promise.all([
        fetchProfile(supabaseUser),
        fetchProgress(supabaseUser.id),
        fetchRole(supabaseUser.id),
        fetchStars(supabaseUser.id),
        fetchTargets(supabaseUser.id),
        updateStreak(supabaseUser.id),
      ]);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session: Session | null) => {
        if (session?.user) {
          setTimeout(() => initUser(session.user), 0);
        } else {
          setUser(null); setProgress({}); setIsAdmin(false); setStars(defaultStars); setTargets([]); setNeedsUsername(false);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) initUser(session.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, fetchProgress, fetchRole, fetchStars, fetchTargets, updateStreak]);

  const login = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? error.message : null;
  };

  const signup = async (email: string, password: string, name: string): Promise<string | null> => {
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: name } } });
    return error ? error.message : null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null); setProgress({}); setIsAdmin(false); setStars(defaultStars); setTargets([]); setNeedsUsername(false);
  };

  const toggleStep = async (skillId: string, stepIndex: number, totalSteps: number) => {
    if (!user) return;

    const existing = progress[skillId];
    const currentSteps = existing?.completedSteps || [];
    const newCompleted = currentSteps.includes(stepIndex)
      ? currentSteps.filter((i) => i !== stepIndex)
      : [...currentSteps, stepIndex];
    const isNowComplete = newCompleted.length === totalSteps;
    const wasComplete = currentSteps.length === totalSteps;

    setProgress((prev) => ({
      ...prev,
      [skillId]: {
        ...prev[skillId],
        completedSteps: newCompleted,
        startedAt: existing?.startedAt || new Date().toISOString(),
        completedAt: isNowComplete ? new Date().toISOString() : undefined,
      },
    }));

    await supabase.from("skill_progress").upsert({
      user_id: user.id, skill_id: skillId, completed_steps: newCompleted,
      started_at: existing?.startedAt || new Date().toISOString(),
      completed_at: isNowComplete ? new Date().toISOString() : null,
    }, { onConflict: "user_id,skill_id" });

    if (isNowComplete && !wasComplete) {
      const { data: starData } = await supabase.from("user_stars").select("*").eq("user_id", user.id).single();
      if (starData) {
        await supabase.from("user_stars").update({
          course_stars: (starData.course_stars || 0) + 2,
          total_stars: (starData.total_stars || 0) + 2,
        }).eq("user_id", user.id);
      } else {
        await supabase.from("user_stars").insert({ user_id: user.id, course_stars: 2, total_stars: 2 });
      }
      refreshStars();
    }
  };

  const getSkillProgress = (skillId: string, totalSteps: number) => {
    const p = progress[skillId];
    if (!p || totalSteps === 0) return 0;
    return Math.round((p.completedSteps.length / totalSteps) * 100);
  };

  const isSkillCompleted = (skillId: string, totalSteps: number) => getSkillProgress(skillId, totalSteps) === 100;

  const getCompletedSkills = () => Object.entries(progress).filter(([, p]) => p.completedAt).map(([id]) => id);

  const addTarget = async (skillId: string) => {
    if (!user) return;
    await supabase.from("user_targets").insert({ user_id: user.id, skill_id: skillId });
    setTargets(prev => [...prev, skillId]);
  };

  const removeTarget = async (skillId: string) => {
    if (!user) return;
    await supabase.from("user_targets").delete().eq("user_id", user.id).eq("skill_id", skillId);
    setTargets(prev => prev.filter(id => id !== skillId));
  };

  const setUsernameComplete = (username: string) => {
    setNeedsUsername(false);
    if (user) setUser({ ...user, username, displayName: username });
  };

  return (
    <AuthContext.Provider value={{
      user, loading, progress, isAdmin, stars, targets, needsUsername,
      login, signup, logout, toggleStep, getSkillProgress, isSkillCompleted,
      getCompletedSkills, refreshStars, addTarget, removeTarget, setUsernameComplete,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
