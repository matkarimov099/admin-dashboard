import type * as React from 'react';
import { createContext, useContext, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/utils/utils';

interface ModalContextValue {
  isDesktop: boolean;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within Modal');
  }
  return context;
};

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onInteractOutside?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
}

interface BaseModalProps {
  children: React.ReactNode;
  className?: string;
}

function Modal({ open, onOpenChange, children }: ModalProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ isDesktop }), [isDesktop]);

  return (
    <ModalContext.Provider value={contextValue}>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={onOpenChange}>
          {children}
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={onOpenChange}>
          {children}
        </Drawer>
      )}
    </ModalContext.Provider>
  );
}

function ModalContent({
  children,
  className,
  showCloseButton = true,
  onInteractOutside,
  onEscapeKeyDown,
}: ModalContentProps) {
  const { isDesktop } = useModalContext();

  return isDesktop ? (
    <DialogContent
      className={cn('flex max-h-[90vh] flex-col sm:max-w-2xl md:w-fit', className)}
      showCloseButton={showCloseButton}
      onInteractOutside={onInteractOutside}
      onEscapeKeyDown={onEscapeKeyDown}
    >
      {children}
    </DialogContent>
  ) : (
    <DrawerContent
      className={cn('flex max-h-[90vh] flex-col p-0', className)}
      onInteractOutside={onInteractOutside}
      onEscapeKeyDown={onEscapeKeyDown}
    >
      {children}
    </DrawerContent>
  );
}

function ModalHeader({ children, className }: BaseModalProps) {
  const { isDesktop } = useModalContext();

  return isDesktop ? (
    <DialogHeader className={cn('px-1', className)}>{children}</DialogHeader>
  ) : (
    <DrawerHeader className={cn('px-4 pt-4 pb-0', className)}>{children}</DrawerHeader>
  );
}

function ModalTitle({ children, className }: BaseModalProps) {
  const { isDesktop } = useModalContext();

  return isDesktop ? (
    <DialogTitle className={cn('!mt-0', className)}>{children}</DialogTitle>
  ) : (
    <DrawerTitle className={className}>{children}</DrawerTitle>
  );
}

function ModalDescription({ children, className }: BaseModalProps) {
  const { isDesktop } = useModalContext();

  return isDesktop ? (
    <DialogDescription className={className}>{children}</DialogDescription>
  ) : (
    <DrawerDescription className={className}>{children}</DrawerDescription>
  );
}

function ModalBody({ children, className }: BaseModalProps) {
  const { isDesktop } = useModalContext();

  return (
    <div
      className={cn('flex-1 space-y-4 overflow-y-auto', isDesktop ? 'px-1 py-3' : 'p-4', className)}
    >
      {children}
    </div>
  );
}

function ModalFooter({ children, className }: BaseModalProps) {
  const { isDesktop } = useModalContext();

  return isDesktop ? (
    <DialogFooter className={cn('px-1', className)}>{children}</DialogFooter>
  ) : (
    <DrawerFooter className={cn('flex-col gap-2 p-4 pt-4', className)}>{children}</DrawerFooter>
  );
}

export { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalDescription };
