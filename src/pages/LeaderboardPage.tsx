import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Star, Flame, BookCheck, Medal } from "lucide-react";
import PageTransition from "@/components/PageTransition";

interface LeaderboardUser {
  user_id: string;
  username: string | null;
  display_name: string | null;
  total_stars: number;
  course_stars: number;
  test_stars: number;
  streak_stars: number;
  current_streak: number;
  longest_streak: number;
  completed_courses: number;
}

type SortKey = "stars" | "courses" | "streak";

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>("stars");

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: profiles }, { data: stars }, { data: progress }] = await Promise.all([
        supabase.from("profiles").select("id, username, display_name"),
        supabase.from("user_stars").select("*"),
        supabase.from("skill_progress").select("user_id, completed_at"),
      ]);

      const mapped: LeaderboardUser[] = (profiles || []).map((p: any) => {
        const s = (stars || []).find((s: any) => s.user_id === p.id);
        const completedCount = (progress || []).filter((pr: any) => pr.user_id === p.id && pr.completed_at).length;
        return {
          user_id: p.id,
          username: p.username,
          display_name: p.display_name,
          total_stars: s?.total_stars || 0,
          course_stars: s?.course_stars || 0,
          test_stars: s?.test_stars || 0,
          streak_stars: s?.streak_stars || 0,
          current_streak: s?.current_streak || 0,
          longest_streak: s?.longest_streak || 0,
          completed_courses: completedCount,
        };
      });
      setUsers(mapped);
      setLoading(false);
    };
    fetchData();
  }, []);

  const sorted = useMemo(() => {
    const copy = [...users];
    if (sortBy === "stars") copy.sort((a, b) => b.total_stars - a.total_stars);
    else if (sortBy === "courses") copy.sort((a, b) => b.completed_courses - a.completed_courses);
    else copy.sort((a, b) => b.longest_streak - a.longest_streak);
    return copy;
  }, [users, sortBy]);

  const getMedalColor = (i: number) => {
    if (i === 0) return "text-yellow-500";
    if (i === 1) return "text-gray-400";
    if (i === 2) return "text-amber-700";
    return "text-muted-foreground";
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2 font-body">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-lg font-display font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-secondary" /> Leaderboard
            </h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex gap-2 mb-6">
            {([
              { key: "stars" as SortKey, label: "Total Stars", icon: Star },
              { key: "courses" as SortKey, label: "Courses", icon: BookCheck },
              { key: "streak" as SortKey, label: "Longest Streak", icon: Flame },
            ]).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-all flex items-center gap-1.5 ${
                  sortBy === key ? "bg-secondary text-secondary-foreground shadow-gold" : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="space-y-3">
              {sorted.map((u, i) => {
                const isCurrentUser = user?.id === u.user_id;
                return (
                  <div
                    key={u.user_id}
                    className={`rounded-2xl border shadow-card p-5 flex items-center gap-4 animate-fade-in transition-all ${
                      isCurrentUser
                        ? "bg-gradient-to-r from-yellow-500/10 via-amber-400/15 to-yellow-500/10 border-yellow-500/50 ring-2 ring-yellow-400/30 shadow-[0_0_20px_-5px_rgba(234,179,8,0.3)]"
                        : i < 3 ? "bg-card border-secondary/40" : "bg-card border-border"
                    }`}
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-lg shrink-0 ${
                      isCurrentUser ? "bg-yellow-500/20" : "bg-muted"
                    }`}>
                      {i < 3 ? <Medal className={`w-6 h-6 ${getMedalColor(i)}`} /> : <span className="text-muted-foreground">{i + 1}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-display font-semibold truncate ${isCurrentUser ? "text-yellow-700 dark:text-yellow-300" : ""}`}>
                        {u.username ? `@${u.username}` : u.display_name || "Anonymous"}
                        {isCurrentUser && <span className="ml-2 text-xs font-body text-yellow-600 dark:text-yellow-400">(You)</span>}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-body mt-0.5">
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-secondary" /> {u.total_stars}</span>
                        <span className="flex items-center gap-1"><BookCheck className="w-3 h-3" /> {u.completed_courses} courses</span>
                        <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-500" /> {u.longest_streak}d streak</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-xl font-display font-bold ${isCurrentUser ? "text-yellow-600 dark:text-yellow-400" : "text-secondary"}`}>
                        {sortBy === "stars" ? u.total_stars : sortBy === "courses" ? u.completed_courses : u.longest_streak}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-body uppercase">
                        {sortBy === "stars" ? "stars" : sortBy === "courses" ? "completed" : "days"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </PageTransition>
  );
};

export default LeaderboardPage;
