// Template for creating new theme-aware components
// Copy-paste and rename as needed

import { getThemeClasses } from '@/utils/theme-classes';
import type { ReactNode } from 'react';

export function ComponentTemplate({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={getThemeClasses(`p-4 bg-card ${className}`)}
      {...props}
    >
      {children}
    </div>
  );
}

// Card variant example:
export function ThemeCard({
  title,
  description,
  children,
  className = ''
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={getThemeClasses(`p-6 bg-card ${className}`)}>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}