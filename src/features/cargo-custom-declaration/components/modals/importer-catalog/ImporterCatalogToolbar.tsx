import { CirclePlusIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

export interface ImporterCatalogToolbarProps {
  onAddNew: () => void;
  onDelete: () => void;
}

export function ImporterCatalogToolbar({
  onAddNew,
  onDelete,
}: ImporterCatalogToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onAddNew}
        hoverText="Yangi importer qo'shish"
      >
        <CirclePlusIcon className="h-4 w-4 text-(--color-primary)" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onDelete}
        hoverText="O'chirish"
      >
        <Trash2 className="h-4 w-4 text-(--color-orange-static)" />
      </Button>
    </div>
  );
}
