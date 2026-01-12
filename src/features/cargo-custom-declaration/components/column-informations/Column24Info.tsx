import { useTranslations } from '@/hooks/use-translations';

export function Column24Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">24.Характер сделки</p>
      {/* Info will be added later */}
    </div>
  );
}
