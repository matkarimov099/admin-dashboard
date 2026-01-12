import { useTranslations } from '@/hooks/use-translations';

export function Column10Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">10.Страна 1-го назнач</p>
      {/* Info will be added later */}
    </div>
  );
}
