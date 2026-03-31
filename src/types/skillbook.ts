export interface WikiLink {
  term: string;
  url: string;
}

export interface TutorialStep {
  step_title: string;
  text: string;
  youtube_links: string[];
  wiki_links: WikiLink[];
}

export interface SkillBook {
  id: string;
  skill_name: string;
  description: string;
  icon: string;
  color: string;
  tutorials: TutorialStep[];
}

export interface UserProgress {
  [skillId: string]: {
    completedSteps: number[];
    startedAt: string;
    completedAt?: string;
  };
}

export interface User {
  email: string;
  name: string;
}
