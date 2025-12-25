import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/utils/utils';

export function CurrentTime({ className }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Map i18n language to BCP 47 locale code
  const getLocale = (lang: string) => {
    const localeMap: Record<string, string> = {
      uz: 'uz-UZ', // Uzbek Latin
      uzcyrl: 'uz-Cyrl-UZ', // Uzbek Cyrillic
      ru: 'ru-RU', // Russian
      en: 'en-US', // English
    };
    return localeMap[lang] || 'en-US';
  };

  const locale = getLocale(i18n.language);

  // Format time as HH:MM:SS
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  // Format date as DD.MM.YYYY
  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '.');
  };

  // Get day name using translations
  const dayIndex = time.getDay();
  const dayName = t(`common.time.dayNames.${dayIndex}`);

  return (
    <div className={cn('flex items-center gap-2 text-sm dark:text-gray-400', className)}>
      <div className="flex flex-col items-center gap-1.5 tabular-nums">
        <div className="flex items-center gap-1 font-bold">
          <Clock className="h-4 w-4" strokeWidth={2.5} />
          <span> {formatTime(time)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{formatDate(time)}</span>
          <span className="text-sm capitalize">{dayName}</span>
        </div>
      </div>
    </div>
  );
}
