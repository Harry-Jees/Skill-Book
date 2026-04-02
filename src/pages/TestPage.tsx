import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const TestPage = () => {
  const { skillId, testNumber } = useParams<{ skillId: string; testNumber: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [testId, setTestId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [existingResult, setExistingResult] = useState<{ score: number; passed: boolean } | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      const { data: test } = await supabase
        .from("skill_tests")
        .select("*")
        .eq("skill_id", skillId)
        .eq("test_number", Number(testNumber))
        .single();

      if (test) {
        setTestId(test.id);
        setQuestions(test.questions as unknown as Question[]);

        // Check if already taken
        if (user) {
          const { data: result } = await supabase
            .from("test_results")
            .select("score, passed")
            .eq("user_id", user.id)
            .eq("test_id", test.id)
            .single();
          if (result) setExistingResult(result);
        }
      }
      setLoading(false);
    };
    fetchTest();
  }, [skillId, testNumber, user]);

  const handleAnswer = (optionIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Calculate score
      const correct = newAnswers.filter((a, i) => a === questions[i].correct).length;
      setScore(correct);
      setSubmitted(true);
      submitResult(correct, newAnswers);
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const submitResult = async (finalScore: number, finalAnswers: number[]) => {
    if (!user || !testId) return;
    const passed = finalScore >= 7;

    await supabase.from("test_results").upsert({
      user_id: user.id,
      test_id: testId,
      skill_id: skillId!,
      score: finalScore,
      total_questions: questions.length,
      answers: finalAnswers,
      passed,
    }, { onConflict: "user_id,test_id" });

    // Award stars based on score
    if (passed) {
      const starsEarned = finalScore >= 10 ? 3 : finalScore >= 8 ? 2 : 1;
      const { data: existing } = await supabase
        .from("user_stars")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (existing) {
        await supabase.from("user_stars").update({
          test_stars: (existing.test_stars || 0) + starsEarned,
          total_stars: (existing.total_stars || 0) + starsEarned,
        }).eq("user_id", user.id);
      } else {
        await supabase.from("user_stars").insert({
          user_id: user.id,
          test_stars: starsEarned,
          total_stars: starsEarned,
        });
      }

      toast({
        title: `🌟 +${starsEarned} Stars!`,
        description: `You passed with ${finalScore}/10! ${starsEarned} star${starsEarned > 1 ? "s" : ""} earned.`,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-lg font-display">No test available yet</p>
          <Button onClick={() => navigate(-1)} className="font-body">Go Back</Button>
        </div>
      </PageTransition>
    );
  }

  if (submitted) {
    const passed = score >= 7;
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-card rounded-2xl border border-border shadow-card p-8 text-center space-y-6">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${passed ? "bg-secondary/20" : "bg-destructive/20"}`}>
              {passed ? <Trophy className="w-10 h-10 text-secondary" /> : <XCircle className="w-10 h-10 text-destructive" />}
            </div>
            <h2 className="text-2xl font-display font-bold">{passed ? "Congratulations!" : "Keep Trying!"}</h2>
            <p className="text-4xl font-display font-bold">{score}/{questions.length}</p>
            <p className="text-muted-foreground font-body">
              {passed ? "You passed! Stars have been awarded." : "You need 7/10 to pass. Review and try again!"}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate(`/skill/${skillId}`)} className="font-body">
                Back to Course
              </Button>
              {!passed && (
                <Button onClick={() => { setCurrentQ(0); setAnswers([]); setSelectedAnswer(null); setShowResult(false); setSubmitted(false); }} className="font-body bg-secondary text-secondary-foreground">
                  Retry
                </Button>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  const q = questions[currentQ];
  const isCorrect = selectedAnswer === q.correct;

  return (
    <PageTransition>
      <div className="min-h-screen">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(`/skill/${skillId}`)} className="gap-2 font-body">
              <ArrowLeft className="w-4 h-4" /> Exit
            </Button>
            <div className="flex-1">
              <Progress value={((currentQ + 1) / questions.length) * 100} className="h-2" />
            </div>
            <span className="text-sm font-body font-medium">{currentQ + 1}/{questions.length}</span>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-8">
          {existingResult && (
            <div className="mb-6 p-4 rounded-xl bg-secondary/10 border border-secondary/20 text-sm font-body">
              You've already taken this test (Score: {existingResult.score}/10). Retaking will update your score.
            </div>
          )}

          <div className="space-y-6 animate-fade-in">
            <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8">
              <p className="text-xs uppercase tracking-wider font-body text-muted-foreground mb-3">Question {currentQ + 1}</p>
              <h2 className="text-xl font-display font-semibold mb-6">{q.question}</h2>

              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  let borderClass = "border-border hover:border-secondary/40";
                  if (showResult && i === q.correct) borderClass = "border-green-500 bg-green-500/10";
                  else if (showResult && i === selectedAnswer && !isCorrect) borderClass = "border-destructive bg-destructive/10";
                  else if (selectedAnswer === i && !showResult) borderClass = "border-secondary bg-secondary/10";

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all font-body ${borderClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                        {showResult && i === q.correct && <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto shrink-0" />}
                        {showResult && i === selectedAnswer && !isCorrect && <XCircle className="w-5 h-5 text-destructive ml-auto shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className="mt-4 p-4 rounded-xl bg-muted text-sm font-body animate-fade-in">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              {!showResult && selectedAnswer !== null && (
                <Button onClick={handleShowResult} variant="outline" className="font-body">
                  Check Answer
                </Button>
              )}
              {showResult && (
                <Button onClick={handleNext} className="font-body bg-secondary text-secondary-foreground">
                  {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default TestPage;
