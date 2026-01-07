import { useTranslations } from '@/hooks/use-translations';

export function Column20Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">20.Условия поставки</p>
      {/* Info will be added later */}
    </div>
  );
}
