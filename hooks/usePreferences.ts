import { useState, useEffect } from 'react';

type Language = 'es' | 'en';
type Theme = 'light' | 'dark';

interface Preferences {
  language: Language;
  theme: Theme;
}

const DEFAULT_PREFERENCES: Preferences = {
  language: 'es',
  theme: 'dark',
};

/**
 * Hook para gestionar preferencias del usuario (idioma y tema)
 * Persiste las preferencias en localStorage
 */
export const usePreferences = () => {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar preferencias desde localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user-preferences');
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
      } else {
        setPreferences(DEFAULT_PREFERENCES);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
      setPreferences(DEFAULT_PREFERENCES);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Aplicar tema a elemento html
  useEffect(() => {
    if (preferences) {
      const root = document.documentElement;
      if (preferences.theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [preferences?.theme]);

  // Cambiar idioma
  const setLanguage = (language: Language) => {
    const updated = { ...preferences!, language };
    setPreferences(updated);
    localStorage.setItem('user-preferences', JSON.stringify(updated));
    document.documentElement.lang = language;
  };

  // Cambiar tema
  const setTheme = (theme: Theme) => {
    const updated = { ...preferences!, theme };
    setPreferences(updated);
    localStorage.setItem('user-preferences', JSON.stringify(updated));
  };

  // Toggle tema
  const toggleTheme = () => {
    const newTheme = preferences?.theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return {
    preferences,
    isLoading,
    setLanguage,
    setTheme,
    toggleTheme,
  };
};

export type { Language, Theme, Preferences };
