import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useId } from 'react';
import { Outlet } from 'react-router';
import { BreadcrumbNav } from '@/components/common/breadcrumb-nav';
import { LanguageSwitcher } from '@/components/common/language-switcher.tsx';
import { ModeToggle } from '@/components/common/mode-toggle.tsx';
import { NotificationPopover } from '@/components/common/notification-popover.tsx';
import { ProfileDropdown } from '@/components/common/profile-dropdown.tsx';
import { SettingsPanel } from '@/components/custom/settings-panel.tsx';
import { HorizontalNav } from '@/components/navigation/horizontal-nav.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';

export const HorizontalLayout = () => {

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <div className="flex h-full min-w-0 flex-col bg-background">
        {/* Top Navigation Bar */}
        <div
          className="shrink-0 border-(--sidebar-border) border-b bg-(--sidebar-bg)"
          style={{
            background: 'var(--header-gradient, var(--sidebar-bg))',
            color: 'var(--header-foreground, inherit)',
          }}
        >
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            {/* Left Section - Navigation */}
            <div className="flex items-center">
              <HorizontalNav />
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-1">
              <NotificationPopover />
              <LanguageSwitcher />
              <SettingsPanel />
              <ModeToggle />
              <ProfileDropdown />
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="shrink-0 border-(--sidebar-border) border-b bg-(--sidebar-bg)/50 px-4 py-2">
          <BreadcrumbNav desktopOnly />
        </div>

        {/* Main Content Area */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col p-2 sm:gap-4 sm:p-4">
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
                {/* Main content */}
                <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden rounded-lg bg-content p-4 shadow-md">
                  <Outlet />
                </main>
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
