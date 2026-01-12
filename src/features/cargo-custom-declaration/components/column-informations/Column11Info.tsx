import { useTranslations } from '@/hooks/use-translations';

export function Column11Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">11.Торг. страна</p>
      {/* Info will be added later */}
    </div>
  );
}
