import { AlertModal } from '@/components/custom/alert-modal.tsx';

interface DeleteTaskProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	taskTitle: string;
	isDeleting: boolean;
	onConfirm: () => void;
}

export const DeleteTask = ({
	open,
	onOpenChange,
	taskTitle,
	isDeleting,
	onConfirm,
}: DeleteTaskProps) => {
	return (
		<AlertModal
			open={open}
			onOpenChange={onOpenChange}
			title="Delete Task"
			description={`Are you sure you want to delete "${taskTitle}"? This action cannot be undone. All associated files and links will also be deleted.`}
			confirmText="Delete"
			isLoading={isDeleting}
			onConfirm={onConfirm}
			type="danger"
		/>
	);
};
