import {AnimatePresence, motion} from 'motion/react';
import {Suspense, useId} from 'react';
import {NavLink, Outlet} from 'react-router';
import {HorizontalNav} from '@/components/common/horizontal-nav.tsx';
import {LanguageSwitcher} from '@/components/common/language-switcher.tsx';
import {NotificationPopover} from '@/components/common/notification-popover.tsx';
import {ProfileDropdown} from '@/components/common/profile-dropdown.tsx';
import {ModeToggle} from '@/components/common/mode-toggle.tsx';
import {SettingsPanel} from '@/components/custom/settings-panel.tsx';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {Spinner} from '@/components/ui/spinner.tsx';
import {useBreadcrumb} from '@/hooks/use-breadcrumb.ts';

export const HorizontalLayout = () => {
    const {breadcrumbItems} = useBreadcrumb();

    return (
        <div className="h-screen w-full overflow-hidden bg-background">
            <div className="flex h-full min-w-0 flex-col bg-background">
                <div className="shrink-0 border-b bg-card">
                    <div className="px-4 lg:px-6 border-b">
                        {/* Logo and Brand */}
                        <div className={"flex h-14 items-center justify-between"}>
                            <HorizontalNav/>
                            <div className="flex items-center gap-1">
                                <NotificationPopover/>
                                <LanguageSwitcher/>
                                <SettingsPanel/>
                                <ModeToggle/>
                                <ProfileDropdown/>
                            </div>
                        </div>
                    </div>
                </div>

                {/*<div className="shrink-0 border-b border-[var(--sidebar-border)] bg-[var(--sidebar-bg)]">*/}
                {/*    <div className="flex h-14 items-center justify-between px-4 lg:px-6">*/}
                {/*        */}
                {/*        /!* Left Section - Navigation *!/*/}
                {/*        <div className="flex items-center">*/}
                {/*            <HorizontalNav/>*/}
                {/*        </div>*/}
                {/*        /!* Right Section - Actions *!/*/}
                {/*        <div className="flex items-center gap-1">*/}
                {/*            <NotificationPopover/>*/}
                {/*            <LanguageSwitcher/>*/}
                {/*            <SettingsPanel/>*/}
                {/*            <ModeToggle/>*/}
                {/*            <ProfileDropdown/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/* Breadcrumb Navigation */}

                <div className="shrink-0 border-b border-[var(--sidebar-border)] bg-[var(--sidebar-bg)]/50 px-4 py-2">
                    <Breadcrumb className="min-w-0">
                        <BreadcrumbList className="flex flex-wrap gap-1">
                            {breadcrumbItems.flatMap((item, index) =>
                                [
                                    <BreadcrumbItem key={`item-${index}`} className="min-w-0">
                                        {item.isActive ? (
                                            <BreadcrumbPage
                                                className="max-w-37.5 truncate font-semibold text-primary sm:max-w-50">
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
                                        <BreadcrumbSeparator key={`separator-${index}`} className="text-secondary"/>
                                    ),
                                ].filter(Boolean)
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {/* Main Content Area */}
                <div className="flex min-h-0 min-w-0 flex-1 flex-col p-2 sm:gap-4 sm:p-4">
                    <Suspense
                        fallback={
                            <div className="flex h-full items-center justify-center bg-background">
                                <Spinner show size="large" className="animate-pulse"/>
                            </div>
                        }
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={useId()}
                                initial={{opacity: 0, y: 8, scale: 0.98}}
                                animate={{opacity: 1, y: 0, scale: 1}}
                                exit={{opacity: 0, y: -4, scale: 1.02}}
                                transition={{
                                    duration: 0.1,
                                    ease: [0.2, 0.9, 0.25, 1],
                                }}
                                className="flex min-h-0 min-w-0 flex-1 flex-col"
                            >
                                {/* Main content */}
                                <main
                                    className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden rounded-lg">
                                    <Outlet/>
                                </main>
                            </motion.div>
                        </AnimatePresence>
                    </Suspense>
                </div>
            </div>
        </div>
    );
};
