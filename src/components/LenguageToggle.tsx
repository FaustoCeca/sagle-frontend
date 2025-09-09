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
      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      {i18n.language === SupportedLanguages.English ? 'EN' : i18n.language === SupportedLanguages.Spanish ? 'ES' : 'FR'}
    </button>
  );
};

export default LanguageToggle;