import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-bold text-3xl">{t('dashboard.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t('dashboard.overview')}</p>
      </div>
    </div>
  );
};

export default Dashboard;
