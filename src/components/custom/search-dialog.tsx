import { File, Folder, ImageIcon, Music, Video } from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

export const title = 'Command Dialog with Separators';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  return (
    <CommandDialog onOpenChange={onOpenChange} open={open} className="min-w-3xl">
      <CommandInput placeholder="Search files..." />
      <CommandList>
        <CommandEmpty>No files found.</CommandEmpty>
        <CommandGroup heading="Recent">
          <CommandItem>
            <File />
            <span>Document.pdf</span>
          </CommandItem>
          <CommandItem>
            <ImageIcon />
            <span>Photo.jpg</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Folders">
          <CommandItem>
            <Folder />
            <span>Projects</span>
          </CommandItem>
          <CommandItem>
            <Folder />
            <span>Documents</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Media">
          <CommandItem>
            <Video />
            <span>Video.mp4</span>
          </CommandItem>
          <CommandItem>
            <Music />
            <span>Song.mp3</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;
