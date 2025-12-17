import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useId } from 'react';
import { NavLink, Outlet } from 'react-router';
import { AppSidebar } from '@/components/common/app-sidebar.tsx';
import { ModeToggle } from '@/components/custom/mode-toggle.tsx';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner.tsx';
import { useBreadcrumb } from '@/hooks/use-breadcrumb.ts';

export const DefaultLayout = () => {
  const { breadcrumbItems } = useBreadcrumb();

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex h-full min-w-0 flex-col bg-background">
          {/* Fixed header - does not scroll */}
          <div className="shrink-0 p-2">
            <header className="glass-strong relative z-50 flex h-12 items-center justify-between gap-2 rounded-lg shadow-sm sm:h-14">
              {/* Left section - Sidebar trigger and breadcrumbs */}
              <div className="flex min-w-0 flex-1 items-center gap-2 px-3 sm:gap-3 sm:px-4">
                <SidebarTrigger className="h-7 w-7 shrink-0 p-0 sm:h-8 sm:w-8" />

                <Breadcrumb className="min-w-0 flex-1">
                  <BreadcrumbList className="flex-wrap gap-1">
                    {breadcrumbItems.flatMap((item, index) =>
                      [
                        <BreadcrumbItem key={`item-${item.url || item.title}`} className="min-w-0">
                          {item.isActive ? (
                            <BreadcrumbPage className="max-w-37.5 truncate font-semibold text-primary sm:max-w-50">
                              {item.title}
                            </BreadcrumbPage>
                          ) : item.url ? (
                            <BreadcrumbLink asChild>
                              <NavLink
                                to={item.url}
                                className="flex items-center gap-2 font-medium text-secondary text-sm transition-colors hover:text-primary"
                              >
                                {item.title}
                              </NavLink>
                            </BreadcrumbLink>
                          ) : (
                            <span className="font-medium text-secondary text-sm">{item.title}</span>
                          )}
                        </BreadcrumbItem>,
                        index < breadcrumbItems.length - 1 && (
                          <BreadcrumbSeparator
                            key={`separator-${item.url || item.title}`}
                            className="text-secondary"
                          />
                        ),
                      ].filter(Boolean)
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Right section - Actions */}
              <div className="flex shrink-0 items-center px-2">
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
                  <main className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden max-h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] p-4 shadow-md rounded-lg bg-content min-w-0">
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
