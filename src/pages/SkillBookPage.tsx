import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { skillBooks } from "@/data/skillbooks";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, Circle, ExternalLink, PlayCircle } from "lucide-react";

const SkillBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { progress, toggleStep, getSkillProgress } = useAuth();

  const book = skillBooks.find((b) => b.id === id);
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
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{book.icon}</span>
            <div>
              <h2 className="text-3xl font-display font-bold">{book.skill_name}</h2>
              <p className="text-muted-foreground font-body mt-1">{book.description}</p>
            </div>
          </div>
          <Progress value={progressVal} className="h-3" />
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {book.tutorials.map((step, index) => {
            const isComplete = skillProgress?.completedSteps.includes(index);

            return (
              <div
                key={index}
                className={`bg-card rounded-2xl border transition-all duration-200 ${
                  isComplete ? "border-secondary/40 bg-secondary/5" : "border-border"
                } shadow-card overflow-hidden`}
              >
                {/* Step Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleStep(book.id, index, book.tutorials.length)}
                      className="mt-0.5 shrink-0 transition-transform hover:scale-110"
                    >
                      {isComplete ? (
                        <CheckCircle2 className="w-6 h-6 text-secondary" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wider">
                          Chapter {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-semibold">{step.step_title}</h3>
                    </div>
                  </div>
                </div>

                {/* Tutorial Text */}
                <div className="px-6 pb-4">
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
                  <div className="px-6 pb-4">
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
                              className="group/vid block rounded-xl overflow-hidden border border-border hover:border-secondary/40 transition-all"
                            >
                              {videoId && (
                                <img
                                  src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                                  alt={`Video ${vi + 1}`}
                                  className="w-full aspect-video object-cover"
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
                  <div className="px-6 pb-6">
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
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default SkillBookPage;
