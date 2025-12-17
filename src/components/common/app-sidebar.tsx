import { Network, Zap } from 'lucide-react';
import type * as React from 'react';

import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import { NavMain } from '@/components/common/nav-main.tsx';
import { NavSecondary } from '@/components/common/nav-secondary.tsx';
import { NavUser } from '@/components/common/nav-user.tsx';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar.tsx';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/utils/utils';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { logout, currentUser } = useAuthContext();
	const { state } = useSidebar();
	const isCollapsed = state === 'collapsed';

	return (
		<Sidebar
			variant="floating"
			collapsible="icon"
			className={cn(
				'transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
				'group-data-[state=collapsed]:backdrop-blur-xl'
			)}
			{...props}
		>
			<SidebarHeader
				className={cn(
					'transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
					isCollapsed && 'flex items-center justify-center px-1.5'
				)}
			>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							asChild
							className={cn(
								'group transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
								isCollapsed && 'justify-center px-2'
							)}
						>
							<LocalizedNavLink to="/">
								<div
									className={cn(
										'relative flex items-center justify-center rounded-lg transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
										isCollapsed ? 'size-8' : 'size-8',
										'bg-blue-500',
										'shadow-lg group-hover:scale-105 group-hover:shadow-xl'
									)}
								>
									{/* Dynamic icon based on the collapse state */}
									{isCollapsed ? (
										<Zap className="relative z-10 size-4 text-white transition-transform duration-300 group-hover:scale-110" />
									) : (
										<Network className="relative z-10 size-4 text-white transition-transform duration-300 group-hover:scale-110" />
									)}
								</div>

								{!isCollapsed && (
									<div className="grid flex-1 text-left text-sm leading-tight transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]">
										<span className="truncate font-bold font-sans text-blue-500 text-lg tracking-wide">
											TeamFlow
										</span>
										<span className="truncate font-medium font-sans text-[var(--secondaryLabel)] text-xs opacity-80">
											Smart workspace
										</span>
									</div>
								)}
							</LocalizedNavLink>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent
				className={cn(
					'transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
					isCollapsed && 'px-1.5'
				)}
			>
				<NavMain />
				<NavSecondary className="mt-auto" />
			</SidebarContent>

			<SidebarFooter
				className={cn(
					'transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.25,1)]',
					isCollapsed && 'items-center'
				)}
			>
				<NavUser user={currentUser} logout={logout} />
			</SidebarFooter>
		</Sidebar>
	);
}
