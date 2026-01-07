import { useTranslations } from '@/hooks/use-translations';

export function Column30Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">30.Место досмотра товара</p>
      {/* Info will be added later */}
    </div>
  );
}
