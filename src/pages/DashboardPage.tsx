import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { skillBooks, categories } from "@/data/skillbooks";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { BookOpen, History, LogOut, CheckCircle2, Search, X, Sparkles, Shield, ClipboardList, Target, Plus, Minus, Trophy, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StarDisplay from "@/components/StarDisplay";
import UsernameModal from "@/components/UsernameModal";

interface AIDraft {
  id: string;
  skill_name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  tutorials: any[];
  status: string;
}

const DashboardPage = () => {
  const { user, logout, getSkillProgress, isSkillCompleted, isAdmin, stars, targets, addTarget, removeTarget, needsUsername, setUsernameComplete } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [publishedAI, setPublishedAI] = useState<AIDraft[]>([]);
  const [skillTests, setSkillTests] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchPublished = async () => {
      const { data } = await supabase.from("ai_skillbooks").select("*").eq("status", "published");
      setPublishedAI((data as AIDraft[]) || []);
    };
    const fetchTests = async () => {
      const { data } = await supabase.from("skill_tests").select("skill_id, test_number");
      if (data) {
        const map: Record<string, number> = {};
        data.forEach((t: any) => { map[t.skill_id] = Math.max(map[t.skill_id] || 0, t.test_number); });
        setSkillTests(map);
      }
    };
    fetchPublished();
    fetchTests();
  }, []);

  const allBooks = useMemo(() => {
    const aiAsSkillBooks = publishedAI.map(ai => ({
      id: `ai-${ai.id}`,
      skill_name: ai.skill_name,
      description: ai.description,
      icon: ai.icon,
      color: ai.color,
      category: ai.category,
      tutorials: (ai.tutorials || []).map((t: any) => ({
        step_title: t.step_title || "",
        text: t.text || "",
        youtube_links: t.youtube_links || [],
        wiki_links: t.wiki_links || [],
      })),
    }));
    return [...skillBooks, ...aiAsSkillBooks];
  }, [publishedAI]);

  const allCategories = useMemo(() => {
    const cats = new Set(categories);
    allBooks.forEach(b => cats.add(b.category));
    return Array.from(cats);
  }, [allBooks]);

  const filteredBooks = useMemo(() => {
    let books = allBooks;
    if (activeCategory) books = books.filter(b => b.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      books = books.filter(b =>
        b.skill_name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    }
    return books;
  }, [search, activeCategory, allBooks]);

  const targetBooks = useMemo(() =>
    allBooks.filter(b => targets.includes(b.id)),
  [allBooks, targets]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const searchFiltered = search.trim()
      ? allBooks.filter(b => {
          const q = search.toLowerCase();
          return b.skill_name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) || b.category.toLowerCase().includes(q);
        })
      : allBooks;
    searchFiltered.forEach(b => { counts[b.category] = (counts[b.category] || 0) + 1; });
    return counts;
  }, [search, allBooks]);

  const renderBookCard = (book: typeof allBooks[0], index: number, showTargetBtn = true) => {
    const progressVal = getSkillProgress(book.id, book.tutorials.length);
    const completed = isSkillCompleted(book.id, book.tutorials.length);
    const hasTest = skillTests[book.id];
    const isTargeted = targets.includes(book.id);

    return (
      <div
        key={book.id}
        className="bg-card rounded-2xl border border-border p-5 text-left shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group animate-fade-in relative"
        style={{ animationDelay: `${Math.min(index * 0.03, 0.5)}s` }}
      >
        {showTargetBtn && (
          <button
            onClick={(e) => { e.stopPropagation(); isTargeted ? removeTarget(book.id) : addTarget(book.id); }}
            className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all z-10 ${
              isTargeted ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground hover:bg-secondary/10 hover:text-secondary"
            }`}
            title={isTargeted ? "Remove from targets" : "Add to target list"}
          >
            {isTargeted ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </button>
        )}
        <button
          onClick={() => navigate(`/skill/${book.id}`)}
          className="w-full text-left"
        >
          <div className="flex items-start justify-between mb-3 pr-8">
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300" role="img">{book.icon}</span>
            <div className="flex items-center gap-1">
              {hasTest && <ClipboardList className="w-4 h-4 text-muted-foreground" />}
              {completed && <CheckCircle2 className="w-5 h-5 text-secondary" />}
            </div>
          </div>
          <div className="mb-1">
            <span className="text-[10px] uppercase tracking-wider font-body text-muted-foreground">{book.category}</span>
          </div>
          <h3 className="text-base font-display font-semibold mb-1.5 group-hover:text-secondary transition-colors line-clamp-1">
            {book.skill_name}
          </h3>
          <p className="text-xs text-muted-foreground font-body mb-3 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-body">
              <span className="text-muted-foreground">{book.tutorials.length} chapters</span>
              <span className="font-medium text-foreground">{progressVal}%</span>
            </div>
            <Progress value={progressVal} className="h-1.5" />
          </div>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {needsUsername && user && (
        <UsernameModal userId={user.id} onComplete={setUsernameComplete} />
      )}

      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-secondary" />
            </div>
            <h1 className="text-xl font-display font-bold">Skill Book</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <StarDisplay
              totalStars={stars.total_stars}
              courseStars={stars.course_stars}
              testStars={stars.test_stars}
              streakStars={stars.streak_stars}
              currentStreak={stars.current_streak}
            />
            <span className="text-sm text-muted-foreground font-body hidden sm:inline">
              @{user?.username || user?.displayName}
            </span>
            {isAdmin && (
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="gap-1.5 font-body text-secondary">
                <Shield className="w-4 h-4" /> <span className="hidden sm:inline">Admin</span>
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => navigate("/history")} className="gap-2 font-body">
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }} className="gap-2 font-body text-muted-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="library">
          <TabsList className="mb-6">
            <TabsTrigger value="library" className="font-body gap-2"><BookOpen className="w-4 h-4" /> Library</TabsTrigger>
            <TabsTrigger value="targets" className="font-body gap-2"><Target className="w-4 h-4" /> Targets ({targetBooks.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="library">
            <div className="mb-8 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                Your Library
                <Sparkles className="inline-block w-6 h-6 text-secondary ml-2 -mt-1" />
              </h2>
              <p className="text-muted-foreground font-body">{allBooks.length} courses to master</p>
            </div>

            <div className="relative mb-6 max-w-md animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 pr-10 font-body" />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-8 animate-fade-in" style={{ animationDelay: "0.15s" }}>
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200 ${
                  !activeCategory ? "bg-secondary text-secondary-foreground shadow-gold" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All ({search.trim() ? filteredBooks.length : allBooks.length})
              </button>
              {allCategories.map(cat => {
                const count = categoryCounts[cat] || 0;
                if (count === 0 && search.trim()) return null;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200 ${
                      activeCategory === cat ? "bg-secondary text-secondary-foreground shadow-gold" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {filteredBooks.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-lg font-display font-semibold mb-1">No courses found</p>
                <p className="text-sm text-muted-foreground font-body">Try a different search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredBooks.map((book, index) => renderBookCard(book, index))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="targets">
            <div className="mb-8 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                Target List
                <Target className="inline-block w-6 h-6 text-secondary ml-2 -mt-1" />
              </h2>
              <p className="text-muted-foreground font-body">Courses you want to complete</p>
            </div>

            {targetBooks.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <p className="text-4xl mb-4">🎯</p>
                <p className="text-lg font-display font-semibold mb-1">No targets yet</p>
                <p className="text-sm text-muted-foreground font-body">Add courses from the Library tab to track your goals</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {targetBooks.map((book, index) => renderBookCard(book, index, false))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DashboardPage;
