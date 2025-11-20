import React from 'react';
import { usePreferences, Language, Theme } from '../hooks/usePreferences';

/**
 * Componente para cambiar idioma y tema
 * Muestra selectores para idioma (ES/EN) y modo oscuro/claro
 */
const PreferencesSwitcher: React.FC = () => {
  const { preferences, isLoading, setLanguage, toggleTheme } = usePreferences();

  if (isLoading || !preferences) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {/* Language Selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="language-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Idioma:
        </label>
        <select
          id="language-select"
          value={preferences.language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded cursor-pointer"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Theme Switcher */}
      <button
        onClick={toggleTheme}
        className="flex items-center gap-1 px-3 py-1 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
        aria-label={`Switch to ${preferences.theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {preferences.theme === 'dark' ? (
          <>
            ☀️ Claro
          </>
        ) : (
          <>
            🌙 Oscuro
          </>
        )}
      </button>
    </div>
  );
};

export default PreferencesSwitcher;
