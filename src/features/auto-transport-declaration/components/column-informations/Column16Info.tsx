import { useTranslations } from '@/hooks/use-translations';

export function Column16Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">16.Страна происхождения</p>
      {/* Info will be added later */}
    </div>
  );
}
