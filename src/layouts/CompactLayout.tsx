import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useId } from 'react';
import { Outlet } from 'react-router';
import { BreadcrumbNav } from '@/components/common/breadcrumb-nav';
import { LanguageSwitcher } from '@/components/common/language-switcher.tsx';
import { ModeToggle } from '@/components/common/mode-toggle.tsx';
import { NotificationPopover } from '@/components/common/notification-popover.tsx';
import { SettingsPanel } from '@/components/custom/settings-panel.tsx';
import { AppSidebar } from '@/components/layout/app-sidebar.tsx';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner.tsx';

export const CompactLayout = () => {

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset className="flex h-full min-w-0 flex-col bg-background">
          {/* Fixed header - does not scroll */}
          <div className="shrink-0 p-2">
            <header
              className="glass-strong relative z-50 flex h-12 items-center justify-between gap-2 rounded-lg shadow-sm sm:h-14"
              style={{
                background: 'var(--header-gradient, var(--card-bg))',
                color: 'var(--header-foreground, inherit)',
              }}
            >
              {/* Left section - sidebar trigger and breadcrumbs */}
              <div className="flex min-w-0 flex-1 items-center gap-2 px-3 sm:gap-3 sm:px-4">
                {/* Compact sidebar trigger */}
                <SidebarTrigger className="h-7 w-7 shrink-0 p-0 sm:h-8 sm:w-8" />
                <BreadcrumbNav />
              </div>

              {/* Right section - Actions */}
              <div className="flex shrink-0 items-center gap-1 px-2">
                <NotificationPopover />
                <LanguageSwitcher />
                <SettingsPanel />
                <ModeToggle />
              </div>

              {/* Glass morphism overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-r from-(--card-bg)/30 via-transparent to-(--card-bg)/30" />
            </header>
          </div>

          {/* Scrollable main content area - flexible height */}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 px-2 pb-2 sm:gap-4">
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
                  <main className="flex max-h-[calc(100vh-5rem)] min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden rounded-lg bg-content p-4 shadow-md sm:h-[calc(100vh-6rem)]">
                    <Outlet />
                  </main>
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
