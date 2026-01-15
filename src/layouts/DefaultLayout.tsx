import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useId } from 'react';
import { Outlet } from 'react-router';
import { CurrentTime } from '@/components/common/current-time';
import { FloatingSearchButton } from '@/components/common/floating-search-button.tsx';
import { LanguageSwitcher } from '@/components/common/language-switcher.tsx';
import { ModeToggle } from '@/components/common/mode-toggle.tsx';
import { NotificationPopover } from '@/components/common/notification-popover.tsx';
import { SettingsPanel } from '@/components/common/settings-panel.tsx';
import { UsersTooltip } from '@/components/common/users-tooltip';
import { AppSidebar } from '@/components/layout/app-sidebar.tsx';
import { BreadcrumbNav } from '@/components/navigation/breadcrumb-nav.tsx';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner.tsx';
import { useTheme } from '@/hooks/use-theme';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { cn } from '@/utils/utils';

export const DefaultLayout = () => {
  const { config } = useThemeConfig();
  const { theme } = useTheme();
  const isDocked = config.sidebarVariant === 'sidebar';

  // Check if gradient is active
  const isDarkMode =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
  const isGradientActive = !isDarkMode && config.backgroundGradient !== 'default';

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <SidebarProvider>
        <AppSidebar variant={config.sidebarVariant} />
        <SidebarInset className="flex h-full min-w-0 flex-col bg-background">
          {/* Fixed header - does not scroll */}
          <div className={cn('shrink-0', isDocked ? 'p-0' : 'p-2')}>
            <header
              className={cn(
                'relative z-40 flex h-12 items-center justify-between gap-2 shadow-sm sm:h-14',
                isDocked ? 'rounded-none' : 'rounded-lg'
              )}
              style={{
                background: 'var(--header-gradient, var(--card-bg))',
                color: 'var(--header-foreground, inherit)',
              }}
            >
              {/* Left section - Sidebar trigger and breadcrumbs */}
              <div className="flex min-w-0 flex-1 items-center gap-2 px-3 sm:gap-3 sm:px-4">
                <SidebarTrigger className="h-5! w-5! shrink-0 p-0 sm:h-8! sm:w-8!" />
                <BreadcrumbNav />
              </div>

              {/* Right section - Actions */}
              <div className="mr-4 flex items-center gap-1.5">
                <CurrentTime className="hidden md:flex" />
                <UsersTooltip className="hidden md:flex" />
                <NotificationPopover />
                <LanguageSwitcher />
                <SettingsPanel />
                <ModeToggle />
              </div>

              {/* Glass morphism overlay - hidden when gradient is active */}
              {!isGradientActive && (
                <div
                  className={cn(
                    'pointer-events-none absolute inset-0 bg-linear-to-r from-(--card-bg)/30 via-transparent to-(--card-bg)/30',
                    isDocked ? 'rounded-none' : 'rounded-lg'
                  )}
                />
              )}
            </header>
          </div>

          {/* Scrollable main content area - flexible height */}
          <div
            className={cn(
              'flex min-h-0 min-w-0 flex-1 flex-col',
              isDocked ? 'gap-2 p-2' : 'gap-3 px-2 pb-2 sm:gap-4'
            )}
          >
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center bg-background">
                  <Spinner show size="large" className="animate-pulse" />
                </div>
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={useId()}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 1.02 }}
                  transition={{
                    duration: 0.1,
                    ease: [0.2, 0.9, 0.25, 1],
                  }}
                  className="flex min-h-0 min-w-0 flex-1 flex-col"
                >
                  {/* Main content - overflow hidden to enable nested scrolling */}
                  <main
                    className={cn(
                      'flex max-h-[calc(100vh-5rem)] min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden bg-content p-4 shadow-md sm:h-[calc(100vh-6rem)]',
                      isDocked ? 'rounded-md' : 'rounded-lg'
                    )}
                  >
                    <Outlet />
                  </main>
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>

      {/* Floating Search Button */}
      <FloatingSearchButton />
    </div>
  );
};
