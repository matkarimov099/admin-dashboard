import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import en from './locales/en';
import ru from './locales/ru';
import uz from './locales/uz';
import uzCyrl from './locales/uz-cyrl';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  uz: {
    translation: uz,
  },
  uzcyrl: {
    translation: uzCyrl,
  },
};

// Get saved language from localStorage or use browser language
const savedLanguage = localStorage.getItem('lang');
const browserLanguage = navigator.language.split('-')[0];
const defaultLanguage =
  savedLanguage ||
  (['en', 'ru', 'uz', 'uzcyrl'].includes(browserLanguage) ? browserLanguage : 'uz');

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage, // Use saved or browser language
    fallbackLng: ['en', 'ru'], // Fallback languages if translation is missing
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    // Debug mode in development
    debug: import.meta.env.DEV,
    // Do not fallback to 'uz' when using 'uz-cyrl'
    returnEmptyString: false,
    returnObjects: false,
  })
  .then();

export default i18n;
