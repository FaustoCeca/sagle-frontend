import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'fr', 'es'],
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}/translation.json',
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage', 'cookie']
        }
    })

// BUG-12: keep <html lang> in sync with the active language (a11y/SEO).
const setHtmlLang = (lng: string) => {
    if (typeof document !== 'undefined' && lng) {
        document.documentElement.lang = lng;
    }
};
i18n.on('languageChanged', setHtmlLang);
setHtmlLang(i18n.language);