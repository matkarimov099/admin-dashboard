import { useTranslations } from '@/hooks/use-translations';

export function Column12Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">12</p>
      {/* Info will be added later */}
    </div>
  );
}
