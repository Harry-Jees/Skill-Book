import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { skillBooks } from "@/data/skillbooks";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, Circle, ExternalLink, Search, ChevronDown, ChevronUp, ClipboardList, Target, Plus, Minus, AlertTriangle, Trophy } from "lucide-react";
import ConfettiCelebration from "@/components/ConfettiCelebration";
import YouTubeThumbnail from "@/components/YouTubeThumbnail";

interface TestResult {
  test_number: number;
  score: number;
  passed: boolean;
}

const SkillBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, progress, toggleStep, getSkillProgress, targets, addTarget, removeTarget } = useAuth();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [testCount, setTestCount] = useState(0);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [aiBook, setAiBook] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState<"chapters" | "tests">("chapters");

  // Load AI book if needed
  useEffect(() => {
    if (!id) return;
    if (id.startsWith("ai-")) {
      const aiId = id.replace("ai-", "");
      supabase.from("ai_skillbooks").select("*").eq("id", aiId).single().then(({ data }) => {
        if (data) setAiBook(data);
      });
    }
  }, [id]);

  // Load tests + results
  useEffect(() => {
    if (!id || !user) return;
    supabase.from("skill_tests").select("test_number").eq("skill_id", id).then(({ data }) => {
      setTestCount(data?.length || 0);
    });
    supabase.from("test_results").select("test_id, score, passed, skill_id")
      .eq("user_id", user.id).eq("skill_id", id!).then(({ data }) => {
        if (data) {
          // Get test numbers for these results
          const testIds = data.map((r: any) => r.test_id);
          if (testIds.length > 0) {
            supabase.from("skill_tests").select("id, test_number").in("id", testIds).then(({ data: tests }) => {
              if (tests) {
                const results: TestResult[] = data.map((r: any) => {
                  const test = tests.find((t: any) => t.id === r.test_id);
                  return { test_number: test?.test_number || 0, score: r.score, passed: r.passed };
                });
                setTestResults(results);
              }
            });
          }
        }
      });
  }, [id, user]);

  const book = useMemo(() => {
    const staticBook = skillBooks.find((b) => b.id === id);
    if (staticBook) return staticBook;
    if (aiBook) return {
      id: `ai-${aiBook.id}`,
      skill_name: aiBook.skill_name,
      description: aiBook.description,
      icon: aiBook.icon,
      color: aiBook.color,
      category: aiBook.category,
      tutorials: (aiBook.tutorials || []).map((t: any) => ({
        step_title: t.step_title || "",
        text: t.text || "",
        youtube_links: t.youtube_links || [],
        wiki_links: t.wiki_links || [],
      })),
    };
    return null;
  }, [id, aiBook]);

  const skillProgress = book ? progress[book.id] : undefined;
  const progressVal = book ? getSkillProgress(book.id, book.tutorials.length) : 0;
  const isTargeted = id ? targets.includes(id) : false;

  // Course completion check
  const allChaptersDone = book ? (skillProgress?.completedSteps.length || 0) === book.tutorials.length : false;
  const avgTestScore = useMemo(() => {
    if (testResults.length === 0) return 0;
    return testResults.reduce((sum, r) => sum + r.score, 0) / testResults.length;
  }, [testResults]);
  const allTestsPassed = testCount > 0 && testResults.length === testCount && testResults.every(r => r.passed);
  const courseFullyCompleted = allChaptersDone && allTestsPassed && avgTestScore >= 7;

  // Auto-remove from target list when completed
  useEffect(() => {
    if (courseFullyCompleted && id && targets.includes(id)) {
      removeTarget(id);
    }
  }, [courseFullyCompleted, id, targets, removeTarget]);

  // Show confetti once when course is completed
  const [confettiShown, setConfettiShown] = useState(false);
  useEffect(() => {
    if (courseFullyCompleted && !confettiShown) {
      setShowConfetti(true);
      setConfettiShown(true);
    }
  }, [courseFullyCompleted, confettiShown]);

  const isYouTubeSearch = (url: string) => url.includes("youtube.com/results");

  if (!book) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 animate-fade-in">
      <p className="text-lg font-display">Loading course...</p>
      <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen">
      <ConfettiCelebration show={showConfetti} onComplete={() => setShowConfetti(false)} />

      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2 font-body">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-display font-bold truncate">{book.skill_name}</h1>
          </div>
          <button
            onClick={() => isTargeted ? removeTarget(book.id) : addTarget(book.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body transition-all ${
              isTargeted ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground hover:bg-secondary/10"
            }`}
          >
            {isTargeted ? <><Minus className="w-3 h-3" /> Targeted</> : <><Plus className="w-3 h-3" /> Add Target</>}
          </button>
          <span className="text-sm font-body font-medium text-secondary">{progressVal}%</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-8 space-y-4 animate-fade-in">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{book.icon}</span>
            <div>
              <span className="text-xs uppercase tracking-wider font-body text-muted-foreground">{book.category}</span>
              <h2 className="text-3xl font-display font-bold">{book.skill_name}</h2>
              <p className="text-muted-foreground font-body mt-1">{book.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={progressVal} className="h-3 flex-1" />
            <span className="text-xs font-body text-muted-foreground whitespace-nowrap">
              {skillProgress?.completedSteps.length || 0} / {book.tutorials.length} chapters
            </span>
          </div>

          {/* Course completion banner */}
          {courseFullyCompleted && (
            <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <p className="font-display font-semibold text-sm">Course Completed! 🎉</p>
                <p className="text-xs text-muted-foreground font-body">Average test score: {avgTestScore.toFixed(1)}/10</p>
              </div>
            </div>
          )}

          {allChaptersDone && testCount > 0 && !allTestsPassed && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
              <div>
                <p className="font-display font-semibold text-sm">Complete all tests to finish this course</p>
                <p className="text-xs text-muted-foreground font-body">
                  Pass all 10 tests with an average score of at least 7/10.
                  {avgTestScore > 0 && ` Current average: ${avgTestScore.toFixed(1)}/10`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("chapters")}
            className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-all ${
              activeTab === "chapters" ? "bg-secondary text-secondary-foreground shadow-gold" : "bg-muted text-muted-foreground"
            }`}
          >
            📖 Chapters ({book.tutorials.length})
          </button>
          <button
            onClick={() => setActiveTab("tests")}
            className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-all ${
              activeTab === "tests" ? "bg-secondary text-secondary-foreground shadow-gold" : "bg-muted text-muted-foreground"
            }`}
          >
            📝 Tests ({testCount}/10)
          </button>
        </div>

        {activeTab === "chapters" && (
          <div className="space-y-3">
            {book.tutorials.map((step, index) => {
              const isComplete = skillProgress?.completedSteps.includes(index);
              const isExpanded = expandedStep === index;

              return (
                <div
                  key={index}
                  className={`bg-card rounded-2xl border transition-all duration-300 animate-fade-in ${
                    isComplete ? "border-secondary/40 bg-secondary/5" : "border-border"
                  } shadow-card overflow-hidden`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <button
                    onClick={() => setExpandedStep(isExpanded ? null : index)}
                    className="w-full p-5 flex items-center gap-4 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div
                      onClick={(e) => { e.stopPropagation(); toggleStep(book.id, index, book.tutorials.length); }}
                      className="shrink-0 transition-transform hover:scale-110"
                    >
                      {isComplete ? <CheckCircle2 className="w-6 h-6 text-secondary" /> : <Circle className="w-6 h-6 text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-body font-medium text-muted-foreground uppercase tracking-wider">Chapter {index + 1}</span>
                        {isComplete && <span className="text-[10px] font-body font-medium text-secondary bg-secondary/10 px-1.5 py-0.5 rounded-full">Done</span>}
                      </div>
                      <h3 className="text-lg font-display font-semibold">{step.step_title}</h3>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
                  </button>

                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-5 pb-4">
                      <div className="pl-10">
                        {step.text.split("\n\n").map((para, i) => (
                          <p key={i} className="text-foreground/80 font-body leading-relaxed mb-3 text-sm">{para}</p>
                        ))}
                      </div>
                    </div>

                    {step.youtube_links.length > 0 && (
                      <div className="px-5 pb-4">
                        <div className="pl-10">
                          <h4 className="text-sm font-body font-semibold mb-3 flex items-center gap-2 text-foreground/70">
                            <Search className="w-4 h-4" /> Video Resources
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {step.youtube_links.map((link, vi) => (
                              <YouTubeThumbnail key={vi} url={link} index={vi} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {step.wiki_links.length > 0 && (
                      <div className="px-5 pb-5">
                        <div className="pl-10">
                          <h4 className="text-sm font-body font-semibold mb-2 text-foreground/70">📚 Learn More</h4>
                          <div className="flex flex-wrap gap-2">
                            {step.wiki_links.map((wiki, wi) => (
                              <a key={wi} href={wiki.url} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-xs font-body font-medium text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors"
                              >
                                {wiki.term} <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "tests" && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-card rounded-2xl border border-border shadow-card p-6">
              <h3 className="text-lg font-display font-bold mb-2 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-secondary" /> Skill Tests
              </h3>
              <p className="text-sm text-muted-foreground font-body mb-1">
                Complete all 10 tests with an average score of 7/10 or higher to finish this course.
              </p>
              {avgTestScore > 0 && (
                <p className={`text-sm font-body font-medium ${avgTestScore >= 7 ? "text-secondary" : "text-destructive"}`}>
                  Current average: {avgTestScore.toFixed(1)}/10 {avgTestScore >= 7 ? "✓" : "— needs improvement"}
                </p>
              )}
            </div>

            {testCount === 0 ? (
              <div className="text-center py-12">
                <p className="text-4xl mb-3">📝</p>
                <p className="text-muted-foreground font-body">Tests haven't been generated for this course yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {Array.from({ length: testCount }, (_, i) => {
                  const result = testResults.find(r => r.test_number === i + 1);
                  return (
                    <Button
                      key={i}
                      variant="outline"
                      onClick={() => navigate(`/test/${book.id}/${i + 1}`)}
                      className={`font-body gap-2 h-auto py-4 flex-col ${
                        result?.passed ? "border-secondary/50 bg-secondary/5" : result ? "border-destructive/50 bg-destructive/5" : ""
                      }`}
                    >
                      <ClipboardList className="w-5 h-5" />
                      <span>Test {i + 1}</span>
                      {result && (
                        <span className={`text-xs ${result.passed ? "text-secondary" : "text-destructive"}`}>
                          {result.score}/10
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
            )}

            {testCount > 0 && testResults.length === testCount && avgTestScore < 7 && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-center">
                <p className="font-display font-semibold text-sm mb-1">Average score below 7/10</p>
                <p className="text-xs text-muted-foreground font-body">
                  Please retake the tests you scored lowest on to improve your average.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SkillBookPage;
