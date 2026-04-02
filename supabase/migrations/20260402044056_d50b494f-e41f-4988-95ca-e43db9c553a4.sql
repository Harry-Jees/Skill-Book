
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles
CREATE POLICY "Anyone can view roles" ON public.user_roles FOR SELECT USING (true);
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update roles" ON public.user_roles FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Skill tests table (AI-generated MCQ tests)
CREATE TABLE public.skill_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id TEXT NOT NULL,
  test_number INT NOT NULL DEFAULT 1,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (skill_id, test_number)
);
ALTER TABLE public.skill_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view tests" ON public.skill_tests FOR SELECT USING (true);
CREATE POLICY "Admins can manage tests" ON public.skill_tests FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update tests" ON public.skill_tests FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete tests" ON public.skill_tests FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Test results table
CREATE TABLE public.test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES public.skill_tests(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  total_questions INT NOT NULL DEFAULT 10,
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  passed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, test_id)
);
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own results" ON public.test_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own results" ON public.test_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all results" ON public.test_results FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- User stars table
CREATE TABLE public.user_stars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_stars INT NOT NULL DEFAULT 0,
  course_stars INT NOT NULL DEFAULT 0,
  test_stars INT NOT NULL DEFAULT 0,
  streak_stars INT NOT NULL DEFAULT 0,
  current_streak INT NOT NULL DEFAULT 0,
  longest_streak INT NOT NULL DEFAULT 0,
  last_login_date DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.user_stars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own stars" ON public.user_stars FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own stars" ON public.user_stars FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own stars" ON public.user_stars FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all stars" ON public.user_stars FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- AI-generated skillbooks storage (drafts before publishing)
CREATE TABLE public.ai_skillbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '📘',
  color TEXT NOT NULL DEFAULT 'blue',
  category TEXT NOT NULL,
  tutorials JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.ai_skillbooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view published" ON public.ai_skillbooks FOR SELECT USING (status = 'published' OR has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert" ON public.ai_skillbooks FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update" ON public.ai_skillbooks FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete" ON public.ai_skillbooks FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_skill_tests_updated_at BEFORE UPDATE ON public.skill_tests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_stars_updated_at BEFORE UPDATE ON public.user_stars
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_skillbooks_updated_at BEFORE UPDATE ON public.ai_skillbooks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-assign 'user' role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();
