import { useTranslations } from '@/hooks/use-translations';

export function Column25Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">25.Вид транспорта на границе</p>
      {/* Info will be added later */}
    </div>
  );
}
