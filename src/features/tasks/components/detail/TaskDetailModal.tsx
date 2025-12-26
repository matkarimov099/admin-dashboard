import { Modal, ModalContent } from '@/components/custom/modal.tsx';

interface TaskDetailModalProps {
  taskKey: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purpose?: string; // 'table' or 'board' to refetch only specific queries
}

export function TaskDetailModal({ open, onOpenChange }: TaskDetailModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="min-w-[70vw]">Modal content here</ModalContent>
    </Modal>
  );
}
