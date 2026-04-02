import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { skillBooks } from "@/data/skillbooks";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, Circle, ExternalLink, PlayCircle, ChevronDown, ChevronUp, ClipboardList } from "lucide-react";

const SkillBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { progress, toggleStep, getSkillProgress } = useAuth();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [testCount, setTestCount] = useState(0);

  const book = skillBooks.find((b) => b.id === id);

  useEffect(() => {
    if (!id) return;
    supabase.from("skill_tests").select("id").eq("skill_id", id).then(({ data }) => {
      setTestCount(data?.length || 0);
    });
  }, [id]);

  if (!book) return <div className="p-8 text-center">Skill not found</div>;

  const skillProgress = progress[book.id];
  const progressVal = getSkillProgress(book.id, book.tutorials.length);

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:v=|\/)([\w-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2 font-body">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-display font-bold truncate">{book.skill_name}</h1>
          </div>
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
              {skillProgress?.completedSteps.length || 0} / {book.tutorials.length} complete
            </span>
          </div>
        </div>

        {/* Steps - Accordion style */}
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
                {/* Step Header - clickable */}
                <button
                  onClick={() => setExpandedStep(isExpanded ? null : index)}
                  className="w-full p-5 flex items-center gap-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <div
                    onClick={(e) => { e.stopPropagation(); toggleStep(book.id, index, book.tutorials.length); }}
                    className="shrink-0 transition-transform hover:scale-110"
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-6 h-6 text-secondary" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-body font-medium text-muted-foreground uppercase tracking-wider">
                        Chapter {index + 1}
                      </span>
                      {isComplete && (
                        <span className="text-[10px] font-body font-medium text-secondary bg-secondary/10 px-1.5 py-0.5 rounded-full">
                          Done
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-display font-semibold">{step.step_title}</h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </button>

                {/* Expandable content */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {/* Tutorial Text */}
                  <div className="px-5 pb-4">
                    <div className="pl-10">
                      {step.text.split("\n\n").map((para, i) => (
                        <p key={i} className="text-foreground/80 font-body leading-relaxed mb-3 text-sm">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* YouTube Videos */}
                  {step.youtube_links.length > 0 && (
                    <div className="px-5 pb-4">
                      <div className="pl-10">
                        <h4 className="text-sm font-body font-semibold mb-3 flex items-center gap-2 text-foreground/70">
                          <PlayCircle className="w-4 h-4" /> Video Resources
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {step.youtube_links.map((link, vi) => {
                            const videoId = getYouTubeId(link);
                            return (
                              <a
                                key={vi}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/vid block rounded-xl overflow-hidden border border-border hover:border-secondary/40 transition-all hover:shadow-card"
                              >
                                {videoId && (
                                  <img
                                    src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                                    alt={`Video ${vi + 1}`}
                                    className="w-full aspect-video object-cover group-hover/vid:scale-105 transition-transform duration-300"
                                  />
                                )}
                                <div className="p-2 flex items-center gap-2 text-xs font-body text-muted-foreground group-hover/vid:text-secondary transition-colors">
                                  <PlayCircle className="w-3.5 h-3.5 shrink-0" />
                                  Watch Video {vi + 1}
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wikipedia Links */}
                  {step.wiki_links.length > 0 && (
                    <div className="px-5 pb-5">
                      <div className="pl-10">
                        <h4 className="text-sm font-body font-semibold mb-2 text-foreground/70">📚 Learn More</h4>
                        <div className="flex flex-wrap gap-2">
                          {step.wiki_links.map((wiki, wi) => (
                            <a
                              key={wi}
                              href={wiki.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-xs font-body font-medium text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors"
                            >
                              {wiki.term}
                              <ExternalLink className="w-3 h-3" />
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

        {/* Tests Section */}
        {testCount > 0 && (
          <div className="mt-8 bg-card rounded-2xl border border-border shadow-card p-6 animate-fade-in">
            <h3 className="text-lg font-display font-bold mb-3 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-secondary" /> Skill Tests
            </h3>
            <p className="text-sm text-muted-foreground font-body mb-4">
              Test your knowledge with {testCount} quiz{testCount > 1 ? "zes" : ""}. Score 7/10 or higher to earn stars!
            </p>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: testCount }, (_, i) => (
                <Button
                  key={i}
                  variant="outline"
                  onClick={() => navigate(`/test/${book.id}/${i + 1}`)}
                  className="font-body gap-2"
                >
                  <ClipboardList className="w-4 h-4" /> Test {i + 1}
                </Button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SkillBookPage;
