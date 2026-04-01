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

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  progress: Record<string, { completedSteps: number[]; startedAt: string; completedAt?: string }>;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (email: string, password: string, name: string) => Promise<string | null>;
  logout: () => Promise<void>;
  toggleStep: (skillId: string, stepIndex: number, totalSteps: number) => void;
  getSkillProgress: (skillId: string, totalSteps: number) => number;
  isSkillCompleted: (skillId: string, totalSteps: number) => boolean;
  getCompletedSkills: () => string[];
}

const AuthContext = createContext<AuthContextType | null>(null);

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

  // Fetch progress from DB
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

  // Fetch profile display name
  const fetchProfile = useCallback(async (supabaseUser: SupabaseUser) => {
    const { data } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", supabaseUser.id)
      .single();

    setUser(mapProfile(supabaseUser, data?.display_name || undefined));
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session: Session | null) => {
        if (session?.user) {
          // Use setTimeout to avoid Supabase auth deadlock
          setTimeout(() => {
            fetchProfile(session.user);
            fetchProgress(session.user.id);
          }, 0);
        } else {
          setUser(null);
          setProgress({});
        }
        setLoading(false);
      }
    );

    // THEN check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user);
        fetchProgress(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, fetchProgress]);

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
  };

  const toggleStep = async (skillId: string, stepIndex: number, totalSteps: number) => {
    if (!user) return;

    // Optimistic update
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

    // Persist to DB
    const existing = progress[skillId];
    const currentSteps = existing?.completedSteps || [];
    const newCompleted = currentSteps.includes(stepIndex)
      ? currentSteps.filter((i) => i !== stepIndex)
      : [...currentSteps, stepIndex];
    const isNowComplete = newCompleted.length === totalSteps;

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
    <AuthContext.Provider value={{ user, loading, progress, login, signup, logout, toggleStep, getSkillProgress, isSkillCompleted, getCompletedSkills }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
