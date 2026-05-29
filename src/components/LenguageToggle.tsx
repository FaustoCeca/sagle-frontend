import { useTranslation } from 'react-i18next';

enum SupportedLanguages {
  English = 'en',
  Spanish = 'es',
  French = 'fr'
}

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const languages: SupportedLanguages[] = [SupportedLanguages.English, SupportedLanguages.Spanish, SupportedLanguages.French];

  const toggleLanguage = () => {
    const newLang = languages[(languages.indexOf(i18n.language as SupportedLanguages) + 1) % languages.length];
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label="toggle-language"
      className="font-display text-[10px] leading-none px-3 py-2 rounded-md text-neon-cyan border border-neon-cyan/60 bg-neon-cyan/10 transition-all hover:bg-neon-cyan/20 hover:text-glow-cyan glow-cyan active:scale-95"
    >
      {i18n.language === SupportedLanguages.English ? 'EN' : i18n.language === SupportedLanguages.Spanish ? 'ES' : 'FR'}
    </button>
  );
};

export default LanguageToggle;