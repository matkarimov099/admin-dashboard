import { useTranslations } from '@/hooks/use-translations';

export function Column18Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">18.Транспортное средство при отправлении</p>
      {/* Info will be added later */}
    </div>
  );
}
