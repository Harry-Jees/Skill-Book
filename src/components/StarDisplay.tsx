import { Star, Flame } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface StarDisplayProps {
  totalStars: number;
  courseStars: number;
  testStars: number;
  streakStars: number;
  currentStreak: number;
}

export default function StarDisplay({ totalStars, courseStars, testStars, streakStars, currentStreak }: StarDisplayProps) {
  return (
    <div className="flex items-center gap-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
            <Star className="w-4 h-4 text-secondary fill-secondary" />
            <span className="text-sm font-body font-semibold text-secondary">{totalStars}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="font-body text-xs">
          <div className="space-y-1">
            <p>📚 Courses: {courseStars} stars</p>
            <p>📝 Tests: {testStars} stars</p>
            <p>🔥 Streaks: {streakStars} stars</p>
          </div>
        </TooltipContent>
      </Tooltip>
      {currentStreak > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-destructive/10 border border-destructive/20">
              <Flame className="w-4 h-4 text-destructive" />
              <span className="text-sm font-body font-semibold text-destructive">{currentStreak}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="font-body text-xs">
            {currentStreak} day streak! Keep it going!
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
