import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);

    const displayName = name || email.split("@")[0];
    const error = isSignup
      ? await signup(email, password, displayName)
      : await login(email, password);

    setSubmitting(false);

    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
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
          <p className="text-muted-foreground font-body">Your personal library of curated learning paths</p>
        </div>

        <div className="bg-card rounded-2xl shadow-card p-8 space-y-6 border border-border">
          <h2 className="text-xl font-display font-semibold text-center">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="name" className="font-body text-sm font-medium">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="font-body"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="font-body"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-body text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="font-body"
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-medium shadow-gold transition-all"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : isSignup ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground font-body">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-secondary font-medium hover:underline"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
