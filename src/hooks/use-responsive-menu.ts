import { useEffect, useRef, useState } from 'react';

interface UseResponsiveMenuOptions {
    itemWidth?: number;     // bitta menu item taxminiy eni (px)
    gap?: number;           // space-x-* oralig‘i
    reservedItems?: number; // "More" tugmasi uchun joy
}

export function useResponsiveMenu({
                                      itemWidth = 130,
                                      gap = 8,
                                      reservedItems = 1,
                                  }: UseResponsiveMenuOptions = {}) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [maxVisibleItems, setMaxVisibleItems] = useState(8);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(entries => {
            const width = entries[0].contentRect.width;

            const fullItemWidth = itemWidth + gap;
            const possibleItems =
                Math.floor(width / fullItemWidth) - reservedItems;

            setMaxVisibleItems(Math.max(1, possibleItems));
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [itemWidth, gap, reservedItems]);

    return { containerRef, maxVisibleItems };
}
