
## Phase 1: Database Changes
1. Add `username` column to `profiles` table (required, unique)
2. Create `user_targets` table (user_id, skill_id) with RLS
3. Update completion logic: course complete = all chapters + all 10 tests passed with avg ≥ 7

## Phase 2: Edge Function Fixes
4. **Fix YouTube URLs**: Remove AI-generated YouTube URLs (AI hallucinates fake URLs). Instead, generate YouTube **search query links** (e.g., `https://youtube.com/results?search_query=...`) so users always land on real results
5. **Fix blank page bug**: Add robust JSON validation and fallback content in `generate-course` to prevent malformed data from being saved
6. Auto-generate 10 tests when a course is published (call generate-test 10 times or generate all in one prompt)

## Phase 3: Frontend Features
7. **Username prompt**: Show a modal on login if user has no username set — required for all users
8. **Tests chapter**: Add a "Tests" tab/chapter at the end of every skill book showing 10 tests
9. **Target list**: Add "Add to Target List" button on courses + a target list section on dashboard
10. **Party popper**: Add confetti animation when course is fully completed (all chapters + tests with avg ≥ 7)
11. **Completion gating**: If avg test score < 7, prompt user to retake failed tests

## Phase 4: Admin Dashboard
12. Show all users' progress with individual chapter completion breakdown
13. Ensure full CRUD functionality for courses, tests, and user management
14. Lock admin role to harryjees@gmail.com only

## Phase 5: Debug & Polish
15. End-to-end testing and bug fixes
