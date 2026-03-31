import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserProgress } from "@/types/skillbook";

interface AuthContextType {
  user: User | null;
  progress: UserProgress;
  login: (email: string, name: string) => void;
  signup: (email: string, name: string) => void;
  logout: () => void;
  toggleStep: (skillId: string, stepIndex: number, totalSteps: number) => void;
  getSkillProgress: (skillId: string, totalSteps: number) => number;
  isSkillCompleted: (skillId: string, totalSteps: number) => boolean;
  getCompletedSkills: () => string[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("skillbook_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem("skillbook_progress");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    if (user) localStorage.setItem("skillbook_user", JSON.stringify(user));
    else localStorage.removeItem("skillbook_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("skillbook_progress", JSON.stringify(progress));
  }, [progress]);

  const login = (email: string, name: string) => setUser({ email, name });
  const signup = (email: string, name: string) => setUser({ email, name });
  const logout = () => { setUser(null); };

  const toggleStep = (skillId: string, stepIndex: number, totalSteps: number) => {
    setProgress((prev) => {
      const skillProgress = prev[skillId] || { completedSteps: [], startedAt: new Date().toISOString() };
      const completed = skillProgress.completedSteps.includes(stepIndex)
        ? skillProgress.completedSteps.filter((i) => i !== stepIndex)
        : [...skillProgress.completedSteps, stepIndex];

      const isNowComplete = completed.length === totalSteps;
      return {
        ...prev,
        [skillId]: {
          ...skillProgress,
          completedSteps: completed,
          completedAt: isNowComplete ? new Date().toISOString() : undefined,
        },
      };
    });
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
    <AuthContext.Provider value={{ user, progress, login, signup, logout, toggleStep, getSkillProgress, isSkillCompleted, getCompletedSkills }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
