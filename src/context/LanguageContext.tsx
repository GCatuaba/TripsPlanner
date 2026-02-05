"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { en } from '@/locales/en';
import { pt } from '@/locales/pt';

type Language = 'en' | 'pt';
type Translations = typeof en;

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('pt'); // Default to PT as requested

    const t = language === 'pt' ? pt : en;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
}
