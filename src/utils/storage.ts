/**
 * LocalStorage utility wrapper for LearnSphere LMS
 * Provides safe JSON parsing and fallback error handling.
 */

const PREFIX = 'learnsphere_';

export const storage = {
  getData: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(`${PREFIX}${key}`);
      if (!item) return defaultValue;
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  saveData: <T>(key: string, data: T): void => {
    try {
      localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  },

  removeData: (key: string): void => {
    try {
      localStorage.removeItem(`${PREFIX}${key}`);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  clearData: (): void => {
    try {
      // Clear only keys starting with PREFIX
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing LearnSphere localStorage:', error);
    }
  }
};
