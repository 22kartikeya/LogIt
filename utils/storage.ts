import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  SYLLABUS: 'syllabus',
  FLASHCARDS: 'flashcards',
  STUDY_STATS: 'studyStats',
  STUDY_SESSIONS: 'studySessions',
  NOTES: 'notes',
  POMODORO_SETTINGS: 'pomodoroSettings',
  THEME_PREFERENCE: 'themePreference',
  USER_PREFERENCES: 'userPreferences',
} as const;

export class Storage {
  static async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  static async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
    }
  }

  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  static async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }
}