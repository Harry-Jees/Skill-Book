
-- Add username to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username text UNIQUE;

-- Create user_targets table
CREATE TABLE public.user_targets (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  skill_id text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

ALTER TABLE public.user_targets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own targets" ON public.user_targets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own targets" ON public.user_targets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own targets" ON public.user_targets
  FOR DELETE USING (auth.uid() = user_id);

-- Add unique constraint on test_results for upsert support
ALTER TABLE public.test_results ADD CONSTRAINT test_results_user_test_unique UNIQUE (user_id, test_id);
