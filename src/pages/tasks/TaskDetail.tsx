import { AlertCircleIcon, ArrowLeftIcon, HomeIcon, ListTodoIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button.tsx';
import { Spinner } from '@/components/ui/spinner';
import { DeleteTask } from '@/features/tasks/components/actions/DeleteTask.tsx';
import { UpdateTask } from '@/features/tasks/components/actions/UpdateTask.tsx';
import { AssigneesCard } from '@/features/tasks/components/detail/AssigneesCard.tsx';
import { AttachmentsGrid } from '@/features/tasks/components/detail/AttachmentsGrid.tsx';
import { CreatorCard } from '@/features/tasks/components/detail/CreatorCard.tsx';
import { LinkedTasksList } from '@/features/tasks/components/detail/LinkedTasksList.tsx';
import { TaskDescription } from '@/features/tasks/components/detail/TaskDescription.tsx';
import { TaskHeader } from '@/features/tasks/components/detail/TaskHeader.tsx';
import { TimelineCard } from '@/features/tasks/components/detail/TimelineCard.tsx';
import { TimeTrackingCard } from '@/features/tasks/components/detail/TimeTrackingCard.tsx';
import {
	useAssignToMe,
	useDeleteTask,
	useGetTaskByKey,
	useUnassignFromMe,
} from '@/features/tasks/hooks/use-tasks.ts';
import { useAuthContext } from '@/hooks/use-auth-context.ts';
import { useDisclosure } from '@/hooks/use-disclosure.ts';

export default function TaskDetail() {
	const { taskKey } = useParams<{ taskKey: string }>();
	const navigate = useNavigate();
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
			},
			onError: (error) => {
				toast.error(error.message || 'Failed to delete task');
			},
		});
	};

	const handleBack = () => navigate(-1);

	if (isFetching && !task) {
		return <Spinner />;
	}

	if (isDeleting) {
		return <Spinner />;
	}

	if (!task || taskDeleted) {
		return (
			<div className="flex min-h-[70vh] items-center justify-center px-4">
				<div className="flex max-w-lg flex-col items-center justify-center space-y-8 p-8 text-center sm:p-12">
					{/* Animated Icon with Gradient Background */}
					<div className="relative">
						<div className="relative rounded-full bg-gradient-to-br from-orange-100 to-red-100 p-8 shadow-md dark:from-orange-950 dark:to-red-950 dark:shadow-sm">
							<AlertCircleIcon className="h-16 w-16 text-orange-600 dark:text-orange-400" />
						</div>
					</div>

					{/* Content */}
					<div className="space-y-3">
						<h1 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text font-bold text-3xl tracking-tight sm:text-4xl">
							Task Not Found
						</h1>
						<p className="max-w-md text-base text-muted-foreground leading-relaxed">
							The task you're looking for doesn't exist or has been removed. It may have been
							deleted or you don't have permission to view it.
						</p>
					</div>

					{/* Action Buttons */}
					<div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
						<Button onClick={handleBack} size="lg" variant="default" className="w-full sm:w-auto">
							<ArrowLeftIcon className="mr-2 h-4 w-4" />
							Go Back
						</Button>
						<Button
							onClick={() => navigate('/tasks/table')}
							size="lg"
							variant="outline"
							className="w-full sm:w-auto"
						>
							<ListTodoIcon className="mr-2 h-4 w-4" />
							Back to Tasks Table
						</Button>
						<Button
							onClick={() => navigate('/')}
							size="lg"
							variant="ghost"
							className="w-full sm:w-auto"
						>
							<HomeIcon className="mr-2 h-4 w-4" />
							Home
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="space-y-6">
				{/* Header */}
				<TaskHeader
					task={task}
					isAssigning={isAssigning}
					isUnassigning={isUnassigning}
					currentUserId={currentUser?.id}
					onBack={handleBack}
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
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<CreatorCard creator={task.creator} />
							<AssigneesCard assignee={task.assignee} isLoading={isAssigning} />
						</div>

						{/* Time & Timeline Row */}
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
			</div>

			{/* Update Task Dialog */}
			{updateDialogOpen && (
				<UpdateTask open={updateDialogOpen} onOpenChange={setUpdateDialogOpen} task={task} />
			)}

			{/* Delete Task Dialog */}
			{deleteDialogOpen && (
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
