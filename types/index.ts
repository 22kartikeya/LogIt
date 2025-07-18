export interface FlashCard {
  id: string;
  front: string;
  back: string;
  subject: string;
  topic: string;
  difficulty: 1 | 2 | 3;
  lastReviewed: number | null;
  nextReview: number;
  correctCount: number;
  incorrectCount: number;
}

export interface SyllabusItem {
  id: string;
  title: string;
  type: 'subject' | 'chapter' | 'topic' | 'subtopic';
  completed: boolean;
  children?: SyllabusItem[];
}

export interface StudySession {
  id: string;
  date: number;
  duration: number; // in minutes
  subject: string;
  topic?: string;
  type: 'focus' | 'break' | 'flashcard' | 'note';
}

export interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  topic: string;
  createdAt: number;
  updatedAt: number;
  tags: string[];
}

export interface StudyStats {
  todayMinutes: number;
  streak: number;
  weeklyGoal: number;
  completedTopics: number;
  totalSessions: number;
  averageSessionLength: number;
}

export interface PomodoroSettings {
  workDuration: number; // in minutes
  breakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  sessionsUntilLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  notifications: boolean;
}