import { Check, ChevronsUpDown, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/utils/utils.ts';

interface TaskOption {
  taskKey: string;
  title: string;
  id: string;
}

interface UrlArrayInputProps {
  value?: string[];
  onChange: (urls: string[]) => void;
  placeholder?: string;
  maxUrls?: number;
  className?: string;
  tasks?: TaskOption[];
  baseUrl?: string;
  onSearchChange?: (search: string) => void;
  isLoadingTasks?: boolean;
}

export function UrlArrayInput({
  value = [],
  onChange,
  placeholder = 'Enter URL',
  maxUrls = 20,
  className,
  tasks = [],
  baseUrl = 'https://teamflow.it-forelead.uz/tasks/',
  onSearchChange,
  isLoadingTasks = false,
}: UrlArrayInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [openTaskSelect, setOpenTaskSelect] = useState(false);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddUrl = (url: string) => {
    if (!url) {
      setError('URL cannot be empty');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    if (value.includes(url)) {
      setError('This URL is already added');
      return;
    }

    if (value.length >= maxUrls) {
      setError(`Maximum ${maxUrls} URLs allowed`);
      return;
    }

    onChange([...value, url]);
    setError(null);
  };

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    handleAddUrl(trimmed);
    setInputValue('');
  };

  const handleTaskSelect = (task: TaskOption) => {
    const taskUrl = `${baseUrl}${task.taskKey}`;
    handleAddUrl(taskUrl);
    setOpenTaskSelect(false);
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      {/* Task Select & Manual URL Input in One Row */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {/* Task Selector - takes 50% on desktop, full width on mobile */}
        {tasks.length > 0 && (
          <Popover open={openTaskSelect} onOpenChange={setOpenTaskSelect}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                aria-expanded={openTaskSelect}
                disabled={value.length >= maxUrls}
                className="w-full justify-between"
              >
                <span className="truncate">Select task</span>
                <ChevronsUpDown className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="z-[100] w-[var(--radix-popover-trigger-width)] p-0"
              align="start"
              onWheel={e => e.stopPropagation()}
            >
              <Command shouldFilter={false} className="max-h-[300px]">
                <CommandInput
                  placeholder="Search by task key or title..."
                  onValueChange={value => onSearchChange?.(value)}
                />
                <CommandList className="max-h-[250px] overflow-y-auto overflow-x-hidden">
                  <CommandEmpty>
                    {isLoadingTasks ? 'Loading tasks...' : 'No task found.'}
                  </CommandEmpty>
                  <CommandGroup>
                    {tasks.map(task => {
                      const isSelected = value.includes(`${baseUrl}${task.taskKey}`);
                      return (
                        <CommandItem
                          key={task.id}
                          value={task.id}
                          onSelect={() => handleTaskSelect(task)}
                          disabled={isSelected}
                          className={cn(isSelected && 'opacity-50')}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4 shrink-0',
                              isSelected ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                            <span className="font-mono text-muted-foreground text-xs">
                              {task.taskKey}
                            </span>
                            <span className="truncate text-sm">{task.title}</span>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}

        {/* Manual URL Input - takes 50% on desktop, full width on mobile */}
        <div className="flex items-center justify-between gap-2">
          <div className="w-full">
            <Input
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
                setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              inputSize="md"
            />
          </div>
          <Button
            type="button"
            onClick={handleAdd}
            variant="outline"
            size="md"
            disabled={value.length >= maxUrls}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* URL List */}
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map(url => (
            <div
              key={url}
              className="flex items-center justify-between gap-2 rounded-md border border-border bg-muted/30 p-2"
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 truncate text-sm transition-colors hover:text-primary"
              >
                {url}
              </a>
              <Button
                type="button"
                onClick={() => handleRemove(value.indexOf(url))}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* URL Counter */}
      {value.length > 0 && (
        <p className="text-muted-foreground text-xs">
          {value.length} / {maxUrls} URLs added
        </p>
      )}
    </div>
  );
}
