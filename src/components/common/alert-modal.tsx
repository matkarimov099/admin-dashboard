import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { createContext, useMemo } from 'react';
import { Button } from '@/components/ui/button';
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

export interface AlertModalProps {
  title: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  isLoading?: boolean;
  loadingText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  type?: 'danger' | 'warning' | 'info';
  autoClose?: boolean;
}

interface AlertModalContextValue {
  isDesktop: boolean;
}

const AlertModalContext = createContext<AlertModalContextValue | undefined>(undefined);

export function AlertModal({
  title,
  description,
  open,
  onOpenChange,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'destructive',
  isLoading = false,
  loadingText = 'Loading...',
  onConfirm,
  onCancel,
  type = 'danger',
  autoClose = true,
}: AlertModalProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ isDesktop }), [isDesktop]);

  const handleConfirm = () => {
    onConfirm();
    if (autoClose) {
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="h-8 w-8 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-8 w-8 text-amber-500" />;
      case 'info':
        return <Info className="h-8 w-8 text-blue-500" />;
      default:
        return <AlertTriangle className="h-8 w-8 text-red-500" />;
    }
  };

  const content = (
    <>
      {isDesktop ? (
        <DialogHeader>
          <DialogTitle className="font-medium text-lg">{title}</DialogTitle>
        </DialogHeader>
      ) : (
        <DrawerHeader className="px-4 pt-4 pb-0">
          <DrawerTitle className="font-medium text-lg">{title}</DrawerTitle>
        </DrawerHeader>
      )}

      <div className={`flex flex-col items-center space-y-3 text-center ${isDesktop ? '' : 'p-4'}`}>
        <div className="shrink-0">{getIcon()}</div>
        {isDesktop ? (
          <DialogDescription className="text-muted-foreground text-sm">
            {description}
          </DialogDescription>
        ) : (
          <DrawerDescription className="text-muted-foreground text-sm">
            {description}
          </DrawerDescription>
        )}
      </div>

      {isDesktop ? (
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? loadingText : confirmText}
          </Button>
        </DialogFooter>
      ) : (
        <DrawerFooter className="p-4 pt-4">
          <Button
            type="button"
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? loadingText : confirmText}
          </Button>
          <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
            {cancelText}
          </Button>
        </DrawerFooter>
      )}
    </>
  );

  return (
    <AlertModalContext.Provider value={contextValue}>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-md">{content}</DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={onOpenChange}>
          <DrawerContent className="flex max-h-[90vh] flex-col p-0">{content}</DrawerContent>
        </Drawer>
      )}
    </AlertModalContext.Provider>
  );
}
