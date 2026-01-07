import { useTranslations } from '@/hooks/use-translations';

export function Column23Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">23.Курс валюты</p>
      {/* Info will be added later */}
    </div>
  );
}
