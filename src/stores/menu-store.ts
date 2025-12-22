import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Menu store state interface
 * Based on cargo-customs menu state management pattern
 */
interface MenuState {
  // Sidebar state
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;

  // Mobile sidebar state
  isMobileSidebarOpen: boolean;

  // Open menu items (for tracking which collapses are expanded)
  openMenuItems: string[];

  // Actions
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleSidebarCollapse: () => void;
  toggleMenuItem: (itemId: string) => void;
  openMenuItem: (itemId: string) => void;
  closeMenuItem: (itemId: string) => void;
  setOpenMenuItems: (items: string[]) => void;
  resetMenuState: () => void;
}

/**
 * Menu store with Zustand
 * Handles sidebar and menu item state management
 *
 * Features:
 * - Persistent state (saved to localStorage)
 * - Sidebar open/collapsed state
 * - Mobile sidebar state
 * - Track which menu items are expanded
 * - Simple and performant
 */
export const useMenuStore = create<MenuState>()(
  persist(
    (set, get) => ({
      // Initial state
      isSidebarOpen: true,
      isSidebarCollapsed: false,
      isMobileSidebarOpen: false,
      openMenuItems: [],

      // Actions
      setSidebarOpen: (open: boolean) => {
        set({ isSidebarOpen: open });
      },

      setSidebarCollapsed: (collapsed: boolean) => {
        set({ isSidebarCollapsed: collapsed });
        // Close all menu items when collapsing
        if (collapsed) {
          set({ openMenuItems: [] });
        }
      },

      setMobileSidebarOpen: (open: boolean) => {
        set({ isMobileSidebarOpen: open });
      },

      toggleSidebar: () => {
        set(state => ({ isSidebarOpen: !state.isSidebarOpen }));
      },

      toggleSidebarCollapse: () => {
        const newCollapsed = !get().isSidebarCollapsed;
        set({ isSidebarCollapsed: newCollapsed });
        // Close all menu items when collapsing
        if (newCollapsed) {
          set({ openMenuItems: [] });
        }
      },

      toggleMenuItem: (itemId: string) => {
        set(state => {
          const isOpen = state.openMenuItems.includes(itemId);
          if (isOpen) {
            return {
              openMenuItems: state.openMenuItems.filter(id => id !== itemId),
            };
          } else {
            return {
              openMenuItems: [...state.openMenuItems, itemId],
            };
          }
        });
      },

      openMenuItem: (itemId: string) => {
        set(state => {
          if (!state.openMenuItems.includes(itemId)) {
            return {
              openMenuItems: [...state.openMenuItems, itemId],
            };
          }
          return state;
        });
      },

      closeMenuItem: (itemId: string) => {
        set(state => ({
          openMenuItems: state.openMenuItems.filter(id => id !== itemId),
        }));
      },

      setOpenMenuItems: (items: string[]) => {
        set({ openMenuItems: items });
      },

      resetMenuState: () => {
        set({
          isSidebarOpen: true,
          isSidebarCollapsed: false,
          isMobileSidebarOpen: false,
          openMenuItems: [],
        });
      },
    }),
    {
      name: 'menu-store', // localStorage key
      partialize: state => ({
        // Only persist these fields
        isSidebarCollapsed: state.isSidebarCollapsed,
        openMenuItems: state.openMenuItems,
      }),
    }
  )
);

/**
 * Helper hook to check if a menu item is open
 */
export const useIsMenuItemOpen = (itemId: string) => {
  return useMenuStore(state => state.openMenuItems.includes(itemId));
};

/**
 * Helper function to programmatically control sidebar
 * Similar to cargo-customs handlerDrawerOpen
 */
export function handlerSidebarOpen(open: boolean) {
  useMenuStore.getState().setSidebarOpen(open);
}

export function handlerSidebarCollapse(collapsed: boolean) {
  useMenuStore.getState().setSidebarCollapsed(collapsed);
}

export function handlerMenuItemToggle(itemId: string) {
  useMenuStore.getState().toggleMenuItem(itemId);
}
