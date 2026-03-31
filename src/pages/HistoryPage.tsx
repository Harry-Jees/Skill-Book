import { useAuth } from "@/contexts/AuthContext";
import { skillBooks } from "@/data/skillbooks";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, Calendar } from "lucide-react";

const HistoryPage = () => {
  const { progress } = useAuth();
  const navigate = useNavigate();

  const completedEntries = Object.entries(progress)
    .filter(([, p]) => p.completedAt)
    .map(([id, p]) => {
      const book = skillBooks.find((b) => b.id === id);
      return book ? { book, completedAt: p.completedAt! } : null;
    })
    .filter(Boolean) as { book: typeof skillBooks[0]; completedAt: string }[];

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2 font-body">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <h1 className="text-lg font-display font-bold">Completion History</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {completedEntries.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <Award className="w-16 h-16 text-muted-foreground/30 mx-auto" />
            <h2 className="text-xl font-display font-semibold text-muted-foreground">No completed skills yet</h2>
            <p className="text-sm text-muted-foreground font-body">Complete all chapters in a skill book to see it here.</p>
            <Button variant="outline" onClick={() => navigate("/dashboard")} className="font-body mt-4">
              Browse Skills
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {completedEntries.map(({ book, completedAt }) => (
              <button
                key={book.id}
                onClick={() => navigate(`/skill/${book.id}`)}
                className="w-full bg-card rounded-2xl border border-secondary/30 p-6 text-left shadow-card hover:shadow-card-hover transition-all flex items-center gap-5"
              >
                <span className="text-4xl">{book.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-lg">{book.skill_name}</h3>
                  <p className="text-sm text-muted-foreground font-body line-clamp-1">{book.description}</p>
                </div>
                <div className="shrink-0 text-right hidden sm:block">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(completedAt).toLocaleDateString()}
                  </div>
                  <Award className="w-5 h-5 text-secondary mt-1 ml-auto" />
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;
