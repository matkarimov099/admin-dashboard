import { ExternalLink, type LucideIcon } from 'lucide-react';

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

export const InfoRow = ({ icon: Icon, label, value, href }: InfoRowProps) => {
  const content = (
    <div className="group flex items-center gap-2.5 rounded-lg border border-transparent p-2.5 transition-all duration-200 hover:border-[var(--border)]/30 hover:bg-[var(--control-hover-bg)]">
      <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-[var(--control-bg)] to-[var(--control-bg)]/50 p-2 shadow-sm">
        <Icon className="h-3.5 w-3.5 text-[var(--system-blue)]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <small className="text-xs sm:text-sm font-medium leading-none">{label}</small>
        <small className="text-xs sm:text-sm font-medium leading-none">{value}</small>
      </div>
      {href && (
        <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-[var(--system-blue)] opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};
