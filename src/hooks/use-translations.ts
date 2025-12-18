import { useTranslation } from 'react-i18next';

export const useTranslations = () => {
  const { t, i18n } = useTranslation();

  return {
    t,
    currentLanguage: i18n.language,
    changeLanguage: i18n.changeLanguage,
    isLoading: !i18n.isInitialized,
  };
};