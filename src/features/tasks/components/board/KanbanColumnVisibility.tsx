import { Check, Eye, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { type TaskStatus, TaskStatusOptions } from '@/features/tasks/types.ts';
import { formatStatusText } from '@/features/tasks/utils/task-helpers.ts';
import { cn } from '@/utils/utils';

interface KanbanColumnVisibilityProps {
  visibleColumns: TaskStatus[];
  onToggleColumn: (status: TaskStatus) => void;
  onReset: () => void;
  size?: 'sm' | 'default' | 'lg';
}

export function KanbanColumnVisibility({
  visibleColumns,
  onToggleColumn,
  onReset,
  size = 'default',
}: KanbanColumnVisibilityProps) {
  const isColumnVisible = (status: TaskStatus) => visibleColumns.includes(status);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Column visibility options"
          variant="outline"
          size={size}
          leftIcon={<Eye className="h-4 w-4" />}
        >
          Columns
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit p-0">
        <Command className="bg-transparent">
          <CommandInput placeholder="Search columns..." />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {TaskStatusOptions.map(option => (
                <CommandItem
                  key={option.value}
                  onSelect={() => onToggleColumn(option.value)}
                  className="flex cursor-pointer items-center"
                >
                  {formatStatusText(option.value)}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      isColumnVisible(option.value) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem onSelect={onReset} className="cursor-pointer justify-center text-center">
                <RotateCcw className="mr-2 h-4 w-4" />
                Show All Columns
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
