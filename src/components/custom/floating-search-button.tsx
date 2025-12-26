import { Search } from 'lucide-react';

import SearchDialog from '@/components/custom/search-dialog';
import { Button } from '@/components/ui/button';
import { useDisclosure } from '@/hooks/use-disclosure';
import { cn } from '@/utils/utils.ts';

interface FloatingSearchButtonProps {
  className?: string;
}

export function FloatingSearchButton({ className }: FloatingSearchButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        size="icon"
        className={cn(
          'group fixed right-4 bottom-4 z-50 h-12 w-12 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl',
          className
        )}
        aria-label="Qidiruv"
      >
        <Search
          strokeWidth={2.5}
          className="h-5! w-5! transition-transform duration-300 group-hover:rotate-5"
        />
        <span className="sr-only">Qidiruv</span>
      </Button>

      <SearchDialog open={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
