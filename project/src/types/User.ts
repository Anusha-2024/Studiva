export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  joinDate: string;
  studyGoal: number;
  favoriteSubject: string;
  studyStreak: number;
  totalStudyTime: number;
  preferences: {
    theme: string;
    notifications: {
      studyReminders: boolean;
      breakReminders: boolean;
      goalDeadlines: boolean;
      weeklyReports: boolean;
    };
  };
}