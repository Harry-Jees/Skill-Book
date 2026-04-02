import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
}

interface SkillProgressData {
  skill_id: string;
  completed_steps: number[];
  started_at: string;
  completed_at: string | null;
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
  login: (email: string, password: string) => Promise<string | null>;
  signup: (email: string, password: string, name: string) => Promise<string | null>;
  logout: () => Promise<void>;
  toggleStep: (skillId: string, stepIndex: number, totalSteps: number) => void;
  getSkillProgress: (skillId: string, totalSteps: number) => number;
  isSkillCompleted: (skillId: string, totalSteps: number) => boolean;
  getCompletedSkills: () => string[];
  refreshStars: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const defaultStars: StarsData = { total_stars: 0, course_stars: 0, test_stars: 0, streak_stars: 0, current_streak: 0, longest_streak: 0, last_login_date: null };

function mapProfile(supabaseUser: SupabaseUser, displayName?: string): UserProfile {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || "",
    displayName: displayName || supabaseUser.user_metadata?.display_name || supabaseUser.email?.split("@")[0] || "User",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<Record<string, { completedSteps: number[]; startedAt: string; completedAt?: string }>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [stars, setStars] = useState<StarsData>(defaultStars);

  const fetchProgress = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("skill_progress")
      .select("skill_id, completed_steps, started_at, completed_at")
      .eq("user_id", userId);

    if (data) {
      const mapped: typeof progress = {};
      data.forEach((row: SkillProgressData) => {
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
      .select("display_name")
      .eq("id", supabaseUser.id)
      .single();
    setUser(mapProfile(supabaseUser, data?.display_name || undefined));
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
    const { data } = await supabase
      .from("user_stars")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (data) {
      setStars({
        total_stars: data.total_stars,
        course_stars: data.course_stars,
        test_stars: data.test_stars,
        streak_stars: data.streak_stars,
        current_streak: data.current_streak,
        longest_streak: data.longest_streak,
        last_login_date: data.last_login_date,
      });
    } else {
      setStars(defaultStars);
    }
  }, []);

  const refreshStars = useCallback(async () => {
    if (user) await fetchStars(user.id);
  }, [user, fetchStars]);

  const updateStreak = useCallback(async (userId: string) => {
    const today = new Date().toISOString().split("T")[0];
    const { data: existing } = await supabase
      .from("user_stars")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!existing) {
      await supabase.from("user_stars").insert({
        user_id: userId,
        current_streak: 1,
        longest_streak: 1,
        streak_stars: 1,
        total_stars: 1,
        last_login_date: today,
      });
      return;
    }

    if (existing.last_login_date === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    let newStreak = 1;
    if (existing.last_login_date === yesterdayStr) {
      newStreak = (existing.current_streak || 0) + 1;
    }

    const streakBonus = newStreak % 7 === 0 ? 3 : newStreak % 3 === 0 ? 2 : 1;
    const newLongest = Math.max(existing.longest_streak || 0, newStreak);

    await supabase.from("user_stars").update({
      current_streak: newStreak,
      longest_streak: newLongest,
      streak_stars: (existing.streak_stars || 0) + streakBonus,
      total_stars: (existing.total_stars || 0) + streakBonus,
      last_login_date: today,
    }).eq("user_id", userId);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session: Session | null) => {
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user);
            fetchProgress(session.user.id);
            fetchRole(session.user.id);
            fetchStars(session.user.id);
            updateStreak(session.user.id);
          }, 0);
        } else {
          setUser(null);
          setProgress({});
          setIsAdmin(false);
          setStars(defaultStars);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user);
        fetchProgress(session.user.id);
        fetchRole(session.user.id);
        fetchStars(session.user.id);
        updateStreak(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, fetchProgress, fetchRole, fetchStars, updateStreak]);

  const login = async (email: string, password: string): Promise<string | null> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? error.message : null;
  };

  const signup = async (email: string, password: string, name: string): Promise<string | null> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    });
    return error ? error.message : null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProgress({});
    setIsAdmin(false);
    setStars(defaultStars);
  };

  const toggleStep = async (skillId: string, stepIndex: number, totalSteps: number) => {
    if (!user) return;

    setProgress((prev) => {
      const existing = prev[skillId] || { completedSteps: [], startedAt: new Date().toISOString() };
      const completed = existing.completedSteps.includes(stepIndex)
        ? existing.completedSteps.filter((i) => i !== stepIndex)
        : [...existing.completedSteps, stepIndex];
      const isNowComplete = completed.length === totalSteps;

      return {
        ...prev,
        [skillId]: {
          ...existing,
          completedSteps: completed,
          completedAt: isNowComplete ? new Date().toISOString() : undefined,
        },
      };
    });

    const existing = progress[skillId];
    const currentSteps = existing?.completedSteps || [];
    const newCompleted = currentSteps.includes(stepIndex)
      ? currentSteps.filter((i) => i !== stepIndex)
      : [...currentSteps, stepIndex];
    const isNowComplete = newCompleted.length === totalSteps;
    const wasComplete = currentSteps.length === totalSteps;

    await supabase
      .from("skill_progress")
      .upsert(
        {
          user_id: user.id,
          skill_id: skillId,
          completed_steps: newCompleted,
          started_at: existing?.startedAt || new Date().toISOString(),
          completed_at: isNowComplete ? new Date().toISOString() : null,
        },
        { onConflict: "user_id,skill_id" }
      );

    // Award course completion star
    if (isNowComplete && !wasComplete) {
      const { data: starData } = await supabase
        .from("user_stars")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (starData) {
        await supabase.from("user_stars").update({
          course_stars: (starData.course_stars || 0) + 2,
          total_stars: (starData.total_stars || 0) + 2,
        }).eq("user_id", user.id);
      } else {
        await supabase.from("user_stars").insert({
          user_id: user.id,
          course_stars: 2,
          total_stars: 2,
        });
      }
      refreshStars();
    }
  };

  const getSkillProgress = (skillId: string, totalSteps: number) => {
    const p = progress[skillId];
    if (!p || totalSteps === 0) return 0;
    return Math.round((p.completedSteps.length / totalSteps) * 100);
  };

  const isSkillCompleted = (skillId: string, totalSteps: number) =>
    getSkillProgress(skillId, totalSteps) === 100;

  const getCompletedSkills = () =>
    Object.entries(progress)
      .filter(([, p]) => p.completedAt)
      .map(([id]) => id);

  return (
    <AuthContext.Provider value={{ user, loading, progress, isAdmin, stars, login, signup, logout, toggleStep, getSkillProgress, isSkillCompleted, getCompletedSkills, refreshStars }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
