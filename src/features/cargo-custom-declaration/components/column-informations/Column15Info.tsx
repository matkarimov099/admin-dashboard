import { useTranslations } from '@/hooks/use-translations';

export function Column15Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">15.Страна отправления</p>
      {/* Info will be added later */}
    </div>
  );
}
