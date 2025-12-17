import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/utils/utils';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  gradient: string;
  description?: string;
}

export const StatCard = ({ icon: Icon, label, value, gradient, description }: StatCardProps) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className={cn(
      'relative overflow-hidden rounded-xl border border-[var(--border)]/50 p-3 sm:p-5',
      'bg-gradient-to-br shadow-sm transition-all duration-300 hover:shadow-md',
      gradient
    )}
  >
    <div className="relative z-10">
      <div className="mb-2 flex items-center gap-1.5 sm:mb-3 sm:gap-2">
        <div className="rounded-lg bg-white/10 p-1.5 backdrop-blur-sm sm:p-2">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <Typography variant="large">{label}</Typography>
      </div>
      <Typography variant="h2">{value.toLocaleString()}</Typography>
      {description && (
        <Typography variant="muted" className="mt-2">
          {description}
        </Typography>
      )}
    </div>
    <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-white/5 blur-2xl" />
  </motion.div>
);
