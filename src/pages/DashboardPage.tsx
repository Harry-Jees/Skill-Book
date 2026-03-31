import { useAuth } from "@/contexts/AuthContext";
import { skillBooks } from "@/data/skillbooks";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { BookOpen, History, LogOut, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { user, logout, getSkillProgress, isSkillCompleted } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-secondary" />
            </div>
            <h1 className="text-xl font-display font-bold">Skill Book</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground font-body hidden sm:inline">
              Hello, {user?.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/history")}
              className="gap-2 font-body"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { logout(); navigate("/"); }}
              className="gap-2 font-body text-muted-foreground"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold mb-2">Your Library</h2>
          <p className="text-muted-foreground font-body">Choose a skill to start learning</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillBooks.map((book) => {
            const progressVal = getSkillProgress(book.id, book.tutorials.length);
            const completed = isSkillCompleted(book.id, book.tutorials.length);

            return (
              <button
                key={book.id}
                onClick={() => navigate(`/skill/${book.id}`)}
                className="bg-card rounded-2xl border border-border p-6 text-left shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl" role="img">{book.icon}</span>
                  {completed && (
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                  )}
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-secondary transition-colors">
                  {book.skill_name}
                </h3>
                <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">
                  {book.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-body">
                    <span className="text-muted-foreground">{book.tutorials.length} chapters</span>
                    <span className="font-medium text-foreground">{progressVal}%</span>
                  </div>
                  <Progress value={progressVal} className="h-2" />
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
