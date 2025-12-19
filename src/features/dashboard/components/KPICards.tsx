import { Activity, Clock, FolderKanban, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { useTranslation } from 'react-i18next';
import type { DashboardKPIs } from '@/features/dashboard/types';

interface KPICardsProps {
  kpis?: DashboardKPIs;
}

export function KPICards({ kpis }: KPICardsProps) {
  const { t } = useTranslation();

  // Provide default values when kpis is undefined (empty database)
  const safeKpis: DashboardKPIs = kpis ?? {
    todayHours: 0,
    weeklyHours: 0,
    productivity: 0,
    activeProjects: 0,
    teamSize: 0,
  };

  const cards = [
    {
      title: t('dashboard.cards.todayHours'),
      value: `${safeKpis.todayHours.toFixed(1)}h`,
      icon: Clock,
      color: 'text-[var(--color-primary)]',
      bgColor: 'bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]/10',
    },
    {
      title: t('dashboard.cards.thisMonth'),
      value: `${safeKpis.weeklyHours.toFixed(1)}h`,
      icon: Activity,
      color: 'text-foreground',
      bgColor: 'bg-muted/50',
    },
    {
      title: t('dashboard.cards.productivity'),
      value: `${safeKpis.productivity.toFixed(0)}%`,
      icon: TrendingUp,
      color: 'text-foreground',
      bgColor: 'bg-muted/50',
    },
    {
      title: t('dashboard.cards.activeProjects'),
      value: safeKpis.activeProjects.toString(),
      icon: FolderKanban,
      color: 'text-foreground',
      bgColor: 'bg-muted/50',
    },
    {
      title: t('dashboard.cards.teamMembers'),
      value: safeKpis.teamSize.toString(),
      icon: Users,
      color: 'text-foreground',
      bgColor: 'bg-muted/50',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {cards.map(card => (
        <Card key={card.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Typography variant="small" className="text-muted-foreground">
                  {card.title}
                </Typography>
                <Typography variant="h2" className="mt-2">
                  {card.value}
                </Typography>
              </div>
              <div className={`rounded-full p-3 ${card.bgColor}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
