import { Trans } from 'react-i18next';
import { useTranslations } from '@/hooks/use-translations';

export function TransExample() {
  const { t } = useTranslations();

  return (
    <div className="space-y-4">
      {/* Oddiy tarjima - t() funksiyasi orqali */}
      <h2>{t('common.save')}</h2>

      {/* Trans komponenti bilan HTML teglari bor tarjimalar */}
      <Trans
        i18nKey="welcome.message" // tarjima kaliti
        components={{
          // Komponentdagi HTML teglariga mos keladigan elementlar
          1: <strong />,
          2: <em />,
        }}
      />

      {/* Dinamik qiymatlar bilan */}
      <Trans
        i18nKey="user.welcome"
        values={{
          name: 'John Doe',
          count: 5,
        }}
        components={{
          1: <strong />,
        }}
      />

      {/* Link bilan */}
      <Trans
        i18nKey="terms.termsAndPrivacy"
        // components={{
        //   1: <a href="/terms" className="text-blue-500 hover:underline" />,
        //   2: <a href="/privacy" className="text-blue-500 hover:underline" />
        // }}
      />
    </div>
  );
}

// Misol uchun locales/en/common.json fayliga qo'shish kerak bo'lgan tarjimalar:
/*
{
  "welcome": {
    "message": "Welcome to <1>our application</1>. Please read the <2>documentation</2> carefully."
  },
  "user": {
    "welcome": "<1>Welcome back, {{name}}!</1> You have <1>{{count}}</1> new notifications."
  },
  "terms": {
    "termsAndPrivacy": "By using this app, you agree to our <1>Terms of Service</1> and <2>Privacy Policy</2>."
  }
}
*/
