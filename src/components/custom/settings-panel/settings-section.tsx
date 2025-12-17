import type { ReactNode } from 'react';

// ============================
// Settings Section Component
// ============================

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="space-y-2">
      {/* Section Header */}
      <div>
        <h3 className="font-medium text-foreground text-xs uppercase tracking-wide opacity-70">
          {title}
        </h3>
        {description && <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>}
      </div>

      {/* Section Content */}
      <div>{children}</div>
    </div>
  );
}
