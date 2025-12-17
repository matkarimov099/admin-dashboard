import { useState } from 'react';
import { toast } from 'sonner';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTitle,
} from '@/components/custom/modal.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useDisclosure } from '@/hooks/use-disclosure.ts';
import {
	useAssignToMe,
	useDeleteTask,
	useGetTaskByKey,
	useUnassignFromMe,
} from '../../hooks/use-tasks';
import { DeleteTask } from '../actions/DeleteTask';
import { UpdateTask } from '../actions/UpdateTask';
import { AssigneesCard } from './AssigneesCard';
import { AttachmentsGrid } from './AttachmentsGrid';
import { CreatorCard } from './CreatorCard';
import { LinkedTasksList } from './LinkedTasksList';
import { TaskDescription } from './TaskDescription';
import { TaskHeader } from './TaskHeader';
import { TimelineCard } from './TimelineCard';
import { TimeTrackingCard } from './TimeTrackingCard';

interface TaskDetailModalProps {
	taskKey: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	purpose?: string; // 'table' or 'board' to refetch only specific queries
}

export function TaskDetailModal({ taskKey, open, onOpenChange, purpose }: TaskDetailModalProps) {
	const [taskDeleted, setTaskDeleted] = useState(false);

	const {
		isOpen: updateDialogOpen,
		onOpen: openUpdateDialog,
		onOpenChange: setUpdateDialogOpen,
	} = useDisclosure();

	const {
		isOpen: deleteDialogOpen,
		onOpen: openDeleteDialog,
		onOpenChange: setDeleteDialogOpen,
	} = useDisclosure();

	const { data: taskResponse, isFetching } = useGetTaskByKey(taskKey);
	const task = taskResponse?.data;
	const { currentUser } = useAuthContext();

	const { mutate: assignTaskToMe, isPending: isAssigning } = useAssignToMe();
	const { mutate: unassignTaskFromMe, isPending: isUnassigning } = useUnassignFromMe();
	const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

	const handleAssignToMe = () => {
		if (!task) return;
		assignTaskToMe(task.id, {
			onSuccess: () => {
				toast.success('Task assigned to you successfully');
			},
			onError: (error) => {
				toast.error(error.message || 'Failed to assign task');
			},
		});
	};

	const handleUnassignFromMe = () => {
		if (!task) return;
		unassignTaskFromMe(task.id, {
			onSuccess: () => {
				toast.success('Task unassigned successfully');
			},
			onError: (error) => {
				toast.error(error.message || 'Failed to unassign task');
			},
		});
	};

	const handleDeleteTask = () => {
		if (!task) return;
		deleteTask(task.id, {
			onSuccess: (response) => {
				toast.success(response?.message || 'Task deleted successfully');
				setTaskDeleted(true);
				setDeleteDialogOpen(false);
				onOpenChange(false); // Close modal after deletion
			},
			onError: (error) => {
				toast.error(error.message || 'Failed to delete task');
			},
		});
	};

	return (
		<>
			<Modal open={open} onOpenChange={onOpenChange}>
				<ModalContent className="min-w-[70vw]">
					{/* Loading State */}
					{isFetching && !task ? (
						<ModalBody>
							<div className="flex items-center justify-center py-12">
								<Spinner />
							</div>
						</ModalBody>
					) : /* Deleting State */ isDeleting ? (
						<ModalBody>
							<div className="flex items-center justify-center py-12">
								<Spinner />
							</div>
						</ModalBody>
					) : /* Task Isn't Found or Deleted */ !task || taskDeleted ? (
						<>
							<ModalHeader>
								<ModalTitle>Task Not Found</ModalTitle>
							</ModalHeader>
							<ModalBody>
								<p className="text-muted-foreground text-sm">
									The task you're looking for doesn't exist or has been deleted.
								</p>
							</ModalBody>
							<div className="flex justify-end px-6 pb-6">
								<Button onClick={() => onOpenChange(false)} variant="default">
									Close
								</Button>
							</div>
						</>
					) : (
						/* Task Details */
						<ModalBody className="space-y-6">
							{/* Header */}
							<TaskHeader
								task={task}
								isAssigning={isAssigning}
								isUnassigning={isUnassigning}
								currentUserId={currentUser?.id}
								onBack={() => onOpenChange(false)}
								onEdit={openUpdateDialog}
								onAssignToMe={handleAssignToMe}
								onUnassignFromMe={handleUnassignFromMe}
								onDelete={openDeleteDialog}
							/>

							{/* Main Content Grid */}
							<div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
								{/* Left Column - Description & Linked Tasks */}
								<div className="space-y-4 sm:space-y-6 lg:col-span-2">
									<TaskDescription description={task.description} />
									<LinkedTasksList linkedTaskUrls={task.linkedTasks || []} />
								</div>

								{/* Right Column - Details */}
								<div className="space-y-4">
									{/* Creator & Assignees Row */}
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
										<CreatorCard creator={task.creator} />
										<AssigneesCard assignee={task.assignee} isLoading={isAssigning} />
									</div>

									{/* Time & Timeline Row */}
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
										<TimeTrackingCard
											estimate={task.estimate}
											deadline={task.deadline}
											completedAt={task.completedAt}
										/>
										<TimelineCard createdAt={task.createdAt} updatedAt={task.updatedAt} />
									</div>
								</div>
							</div>

							{/* Attachments Section - Full Width */}
							<AttachmentsGrid taskId={task.id} assets={task.assets || []} />
						</ModalBody>
					)}
				</ModalContent>
			</Modal>

			{/* Update Task Dialog */}
			{updateDialogOpen && task && (
				<UpdateTask
					open={updateDialogOpen}
					onOpenChange={setUpdateDialogOpen}
					task={task}
					purpose={purpose}
				/>
			)}

			{/* Delete Task Dialog */}
			{deleteDialogOpen && task && (
				<DeleteTask
					open={deleteDialogOpen}
					onOpenChange={setDeleteDialogOpen}
					taskTitle={task.title}
					isDeleting={isDeleting}
					onConfirm={handleDeleteTask}
				/>
			)}
		</>
	);
}
