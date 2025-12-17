// Examples showing how simple theme integration works

import { getThemeClasses, getThemeColorClasses, getThemeInputClasses } from '@/utils/theme-classes';

export function SimpleCard({ children, className = '', ...props }) {
  return (
    <div className={getThemeClasses(`p-4 bg-card ${className}`)} {...props}>
      {children}
    </div>
  );
}

export function ThemedButton({ children, className = '', ...props }) {
  return (
    <button
      className={getThemeColorClasses(`px-4 py-2 ${className}`)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ThemedInput({ className = '', ...props }) {
  return (
    <input
      className={getThemeInputClasses(`px-3 py-2 ${className}`)}
      {...props}
    />
  );
}