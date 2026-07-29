import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [ isSettingsLoaded, setIsSettingsLoaded ] = useState(false);
  const [ theme, setTheme ] = useState("dark");
  const [ lang, setLang ] = useState("ru");
  const [ animCount, setAnimCount ] = useState(0);

  useEffect(() => {
    const loadSettings = () => {
      try {
        const saved = localStorage.getItem("dmtSoft_website");
        if (saved) {
          const parsed = JSON.parse(saved);
          setTheme(parsed.theme ?? "dark");
          setLang(parsed.lang ?? "ru");
          setAnimCount(parsed.animCount ?? 0);
          setIsSettingsLoaded(true);
        } else {
          localStorage.setItem("dmtSoft_website", JSON.stringify({ theme: "dark", lang: "ru", animCount: 0 }));
          setIsSettingsLoaded(true);
        }
      } catch (err) {
        setIsSettingsLoaded(true);
      }
    };
    loadSettings();
  }, []);

  const save = (overrides) => {
    const data = { theme, lang, animCount, ...overrides };
    try {
      localStorage.setItem("dmtSoft_website", JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    save({ theme: newTheme });
  };

  const updateLang = (newLang) => {
    setLang(newLang);
    save({ lang: newLang });
  };
  const updateAnimCount = (newAnimCount) => {
    setAnimCount(newAnimCount);
    save({ animCount: newAnimCount });
  };

  const resetSettings = () => {
    save({ theme: 'dark', lang: 'ru', animCount: 0 });
  };

  return (
    <SettingsContext.Provider value={{ theme, lang, animCount, isSettingsLoaded, updateTheme, updateLang, updateAnimCount, resetSettings }}>
      <div className={`landing_page ${theme}`}>
        {children}
      </div>
    </SettingsContext.Provider>
  );
};

export const useLocalSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useLocalSettings должен использоваться внутри SettingsProvider");
  }
  return context;
};
