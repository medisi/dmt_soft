import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("ru");

  useEffect(() => {
    const loadSettings = () => {
      try {
        const saved = localStorage.getItem("dmtSoft_website");
        if (saved) {
          const parsed = JSON.parse(saved);
          setTheme(parsed.theme ?? "dark");
          setLang(parsed.lang ?? "ru");
          setIsSettingsLoaded(true);
        } else {
          localStorage.setItem("dmtSoft_website", JSON.stringify({ theme: "dark", lang: "ru" }));
          setIsSettingsLoaded(true);
        }
      } catch (err) {
        setIsSettingsLoaded(true);
      }
    };
    loadSettings();
  }, []);

  const save = (overrides) => {
    const data = { theme, lang, ...overrides };
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

  return (
    <SettingsContext.Provider value={{ theme, lang, isSettingsLoaded, updateTheme, updateLang }}>
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




// const useLocalSettings = () => {
//     const [ isSettingsLoaded, setIsSettingsLoaded ] = useState(false);
//     const [ theme, setTheme ] = useState('dark');
//     const [ lang, setLang ] = useState('ru');

//     // чтение из локального хранилища
//     useEffect(() => {
//         const loadSettings = () => {
//             try {
//                 const savedSettings = localStorage.getItem('dmtSoft_website');
//                 if (savedSettings) {
//                     const parsed = JSON.parse(savedSettings);
//                     setTheme(parsed.theme ?? 'dark');
//                     setLang(parsed.lang ?? 'ru');
//                     setIsSettingsLoaded(true);
//                 } else {
//                     const defaultSettings = {
//                         theme: 'dark',
//                         lang: 'ru'
//                     };
//                     localStorage.setItem('dmtSoft_website', JSON.stringify(defaultSettings));
//                 }
//             } catch (err) {
//                 setIsSettingsLoaded(true);
//             }
//         };
//         loadSettings();
//     }, []);

//     const getCurrentSettings = useCallback(() => ({
//         theme,
//         lang
//     }), [
//         theme, lang
//     ]);

//     // универсальная функция сохранения
//     const saveToLocalStorage = useCallback((overrides = {}) => {
//         const settings = { ...getCurrentSettings(), ...overrides };
//         try {
//             localStorage.setItem('dmtSoft_website', JSON.stringify(settings));
//         } catch (err) {
//             console.log('Ошибка сохранения в localStorage: ', err);
//         }
//     }, [getCurrentSettings]);

//     // обновление темы
//     const updateTheme = useCallback((newTheme) => {
//         setTheme(newTheme);
//         saveToLocalStorage({ theme: newTheme });
//     }, [saveToLocalStorage]);
//     // обновление языка
//     const updateLang = useCallback((newLang) => {
//         setLang(newLang);
//         saveToLocalStorage({ lang: newLang });
//     }, [saveToLocalStorage]);

//     return {
//         theme,
//         lang,
//         isSettingsLoaded,
//         updateTheme,
//         updateLang,
//         getCurrentSettings
//     };
// };

// export default useLocalSettings;