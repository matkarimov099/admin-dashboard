import { NavLink } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbDropdown,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useBreadcrumb } from '@/hooks/use-breadcrumb';

interface BreadcrumbNavProps {
  /**
   * Show mobile version (only last item)
   * Default: false (shows all items)
   */
  mobileOnly?: boolean;
  /**
   * Show desktop version (all items or collapsed)
   * Default: false (shows mobile version)
   */
  desktopOnly?: boolean;
}

export function BreadcrumbNav({ mobileOnly = false, desktopOnly = false }: BreadcrumbNavProps) {
  const { breadcrumbItems } = useBreadcrumb();

  // Mobile version: Show only the last item
  if (mobileOnly) {
    return (
      <Breadcrumb className="min-w-0 flex-1">
        <BreadcrumbList className="flex flex-wrap gap-1">
          {breadcrumbItems.slice(-1).map((item, index) => (
            <BreadcrumbItem key={`item-${index}`} className="min-w-0">
              <BreadcrumbPage className="max-w-37.5 truncate font-semibold text-primary">
                {item.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Desktop version: Show all items or collapsed if 4+
  if (desktopOnly) {
    return (
      <Breadcrumb className="min-w-0 flex-1">
        <BreadcrumbList className="flex flex-wrap gap-1">
          {breadcrumbItems.length >= 3 ? (
            <>
              {/* First item */}
              <BreadcrumbItem className="min-w-0">
                {breadcrumbItems[0].url ? (
                  <BreadcrumbLink asChild>
                    <NavLink
                      to={breadcrumbItems[0].url}
                      className="flex items-center gap-2 font-medium text-secondary text-sm transition-colors hover:text-primary"
                    >
                      {breadcrumbItems[0].title}
                    </NavLink>
                  </BreadcrumbLink>
                ) : (
                  <span className="font-medium text-secondary text-sm">
                    {breadcrumbItems[0].title}
                  </span>
                )}
              </BreadcrumbItem>

              <BreadcrumbSeparator className="text-secondary" />

              {/* Dropdown for middle items */}
              <BreadcrumbDropdown>
                {breadcrumbItems.slice(1, -1).map((item, index) => (
                  <DropdownMenuItem key={`dropdown-${index}`} asChild={!!item.url}>
                    {item.url ? (
                      <NavLink
                        to={item.url}
                        className="flex w-full cursor-pointer items-center px-3 py-2 font-medium text-blue text-sm transition-colors hover:underline"
                      >
                        {item.title}
                      </NavLink>
                    ) : (
                      <span className="flex items-center px-3 py-2 font-medium text-muted-foreground text-sm">
                        {item.title}
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </BreadcrumbDropdown>

              <BreadcrumbSeparator className="text-secondary" />

              {/* Last item (active) */}
              <BreadcrumbItem className="min-w-0">
                <BreadcrumbPage className="max-w-37.5 truncate font-semibold text-primary sm:max-w-50">
                  {breadcrumbItems[breadcrumbItems.length - 1].title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : (
            /* Show all items if less than 4 */
            breadcrumbItems.flatMap((item, index) =>
              [
                <BreadcrumbItem key={`item-${index}`} className="min-w-0">
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
                  <BreadcrumbSeparator key={`separator-${index}`} className="text-secondary" />
                ),
              ].filter(Boolean)
            )
          )}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Default: Full responsive version (mobile + desktop)
  return (
    <Breadcrumb className="min-w-0 flex-1">
      {/* Mobile: Show only the last item */}
      <BreadcrumbList className="flex flex-wrap gap-1 sm:hidden">
        {breadcrumbItems.slice(-1).map((item, index) => (
          <BreadcrumbItem key={`item-${index}`} className="min-w-0">
            <BreadcrumbPage className="max-w-37.5 truncate font-semibold text-primary">
              {item.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>

      {/* Desktop: Show all items or collapsed if 4+ */}
      <BreadcrumbList className="hidden flex-wrap gap-1 sm:flex">
        {breadcrumbItems.length >= 4 ? (
          <>
            {/* First item */}
            <BreadcrumbItem className="min-w-0">
              {breadcrumbItems[0].url ? (
                <BreadcrumbLink asChild>
                  <NavLink
                    to={breadcrumbItems[0].url}
                    className="flex items-center gap-2 font-medium text-secondary text-sm transition-colors hover:text-primary"
                  >
                    {breadcrumbItems[0].title}
                  </NavLink>
                </BreadcrumbLink>
              ) : (
                <span className="font-medium text-secondary text-sm">
                  {breadcrumbItems[0].title}
                </span>
              )}
            </BreadcrumbItem>

            <BreadcrumbSeparator className="text-secondary" />

            {/* Dropdown for middle items */}
            <BreadcrumbDropdown>
              {breadcrumbItems.slice(1, -1).map((item, index) => (
                <DropdownMenuItem key={`dropdown-${index}`} asChild={!!item.url}>
                  {item.url ? (
                    <NavLink
                      to={item.url}
                      className="flex w-full cursor-pointer items-center font-medium text-blue text-sm transition-colors hover:underline"
                    >
                      {item.title}
                    </NavLink>
                  ) : (
                    <span className="flex items-center font-medium text-muted-foreground text-sm">
                      {item.title}
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
            </BreadcrumbDropdown>

            <BreadcrumbSeparator className="text-secondary" />

            {/* Last item (active) */}
            <BreadcrumbItem className="min-w-0">
              <BreadcrumbPage className="max-w-37.5 truncate font-semibold text-primary sm:max-w-50">
                {breadcrumbItems[breadcrumbItems.length - 1].title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          /* Show all items if less than 4 */
          breadcrumbItems.flatMap((item, index) =>
            [
              <BreadcrumbItem key={`item-${index}`} className="min-w-0">
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
                <BreadcrumbSeparator key={`separator-${index}`} className="text-secondary" />
              ),
            ].filter(Boolean)
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
