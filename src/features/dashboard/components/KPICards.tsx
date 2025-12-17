import { Activity, Clock, FolderKanban, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import type { DashboardKPIs } from '@/features/dashboard/types';

interface KPICardsProps {
  kpis?: DashboardKPIs;
}

export function KPICards({ kpis }: KPICardsProps) {
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
      title: 'Today Hours',
      value: `${safeKpis.todayHours.toFixed(1)}h`,
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'Weekly Hours',
      value: `${safeKpis.weeklyHours.toFixed(1)}h`,
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: 'Productivity',
      value: `${safeKpis.productivity.toFixed(0)}%`,
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
    {
      title: 'Active Projects',
      value: safeKpis.activeProjects.toString(),
      icon: FolderKanban,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      title: 'Team Size',
      value: safeKpis.teamSize.toString(),
      icon: Users,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-950',
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
