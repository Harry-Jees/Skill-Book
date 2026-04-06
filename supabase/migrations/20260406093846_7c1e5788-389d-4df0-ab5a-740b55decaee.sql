
-- Insert admin role for harryjees@gmail.com
INSERT INTO public.user_roles (user_id, role) 
VALUES ('0db39014-4584-4d7b-9843-cde9868e9a47', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Allow all authenticated users to view profiles (for leaderboard)
CREATE POLICY "All authenticated can view profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Allow all authenticated users to view user_stars (for leaderboard)
CREATE POLICY "All authenticated can view stars"
ON public.user_stars
FOR SELECT
TO authenticated
USING (true);

-- Allow all authenticated users to view skill_progress (for leaderboard course count)
CREATE POLICY "All authenticated can view progress"
ON public.skill_progress
FOR SELECT
TO authenticated
USING (true);
