"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = {
  code: string
  name: string
}

type LanguageContextType = {
  language: string
  setLanguage: (code: string) => void
  languages: Language[]
}

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "pt", name: "Português" },
  { code: "zh", name: "中文" },
]

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState("en")

  // Load language preference from localStorage on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setLanguageState(storedLanguage)
      }
    }
  }, [])

  const setLanguage = (code: string) => {
    setLanguageState(code)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", code)
    }
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

