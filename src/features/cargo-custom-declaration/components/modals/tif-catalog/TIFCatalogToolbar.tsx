import { CirclePlusIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

export interface TIFCatalogToolbarProps {
  onAddNew: () => void;
  onDelete: () => void;
  addHoverText?: string;
}

export function TIFCatalogToolbar({
  onAddNew,
  onDelete,
  addHoverText = "Yangi qo'shish",
}: TIFCatalogToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onAddNew}
        hoverText={addHoverText}
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
