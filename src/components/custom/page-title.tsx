import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '@/hooks/use-page-title.ts';

interface PageTitleProps {
  title: string; // Translation key
}

export const PageTitle = ({ title }: PageTitleProps) => {
  const { t } = useTranslation();
  const { setTitle } = usePageTitle();

  const translatedTitle = t(title);

  useEffect(() => {
    setTitle(translatedTitle);
    document.title = translatedTitle;
  }, [translatedTitle, setTitle]);

  return null;
};
