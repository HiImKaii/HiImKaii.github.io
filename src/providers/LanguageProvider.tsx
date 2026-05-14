"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Lang = "vi" | "en";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (vi: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "vi",
  toggleLang: () => {},
  t: (vi) => vi,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Lang) || "vi";
    }
    return "vi";
  });

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "vi" ? "en" : "vi";
      localStorage.setItem("language", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (vi: string, en: string) => (lang === "vi" ? vi : en),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
