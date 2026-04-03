import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User } from "lucide-react";

interface UsernameModalProps {
  userId: string;
  onComplete: (username: string) => void;
}

const UsernameModal = ({ userId, onComplete }: UsernameModalProps) => {
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    if (trimmed.length > 20) {
      setError("Username must be 20 characters or less");
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      setError("Only letters, numbers, and underscores allowed");
      return;
    }

    setSubmitting(true);
    setError("");

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ username: trimmed, display_name: trimmed })
      .eq("id", userId);

    if (updateError) {
      if (updateError.message.includes("unique") || updateError.message.includes("duplicate")) {
        setError("This username is already taken");
      } else {
        setError(updateError.message);
      }
      setSubmitting(false);
      return;
    }

    toast({ title: "Welcome!", description: `Your username is @${trimmed}` });
    onComplete(trimmed);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-card rounded-2xl border border-border shadow-card p-8 space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto">
            <User className="w-7 h-7 text-secondary" />
          </div>
          <h2 className="text-xl font-display font-bold">Choose a Username</h2>
          <p className="text-sm text-muted-foreground font-body">Pick a unique username to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="font-body text-sm font-medium">Username</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-body">@</span>
              <Input
                id="username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                placeholder="your_username"
                className="pl-8 font-body"
                autoFocus
                maxLength={20}
              />
            </div>
            {error && <p className="text-xs text-destructive font-body">{error}</p>}
            <p className="text-xs text-muted-foreground font-body">3-20 characters, letters, numbers, and underscores only</p>
          </div>
          <Button type="submit" disabled={submitting || username.trim().length < 3} className="w-full bg-secondary text-secondary-foreground font-body">
            {submitting ? "Saving..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;
