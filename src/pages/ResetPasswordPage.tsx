import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for recovery event from the URL hash
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get("type");
    if (type === "recovery") {
      setReady(true);
    } else {
      // Also listen for auth state change with recovery event
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === "PASSWORD_RECOVERY") {
          setReady(true);
        }
      });
      // Give it a moment, then mark ready anyway (user might already have session)
      const timeout = setTimeout(() => setReady(true), 1000);
      return () => {
        subscription.unsubscribe();
        clearTimeout(timeout);
      };
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Your password has been updated." });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/20 shadow-gold">
            <BookOpen className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold font-display text-foreground">Skill Book</h1>
        </div>

        <div className="bg-card rounded-2xl shadow-card p-8 space-y-6 border border-border">
          <h2 className="text-xl font-display font-semibold text-center">Set New Password</h2>

          {!ready ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-secondary" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="font-body text-sm font-medium">New Password</Label>
                <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="font-body" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm" className="font-body text-sm font-medium">Confirm Password</Label>
                <Input id="confirm" type="password" required minLength={6} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="font-body" />
              </div>
              <Button type="submit" disabled={submitting} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-medium shadow-gold transition-all">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground font-body">
            <button onClick={() => navigate("/")} className="text-secondary font-medium hover:underline">Back to sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
