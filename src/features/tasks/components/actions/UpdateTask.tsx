import { zodResolver } from '@hookform/resolvers/zod';
import { ExternalLinkIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DateTimePicker } from '@/components/custom/date-time-picker';
import { FileUploader } from '@/components/custom/file-uploader';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '@/components/custom/modal';
import { UrlArrayInput } from '@/components/custom/url-array-input';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { PriorityBadge } from '@/features/tasks/components/badges/PriorityBadge.tsx';
import { StatusBadge } from '@/features/tasks/components/badges/StatusBadge.tsx';
import { useGetUsers } from '@/features/users/hooks/use-users';
import { useDeleteTaskAsset, useGetTasks, useUpdateTask } from '../../hooks/use-tasks';
import { type TaskUpdateSchema, taskUpdateSchema } from '../../schema/tasks.schema';
import type { Task, TaskUpdate } from '../../types';
import { TaskPriorityOptions, TaskStatusOptions, TaskWorkTypeOptions } from '../../types';

interface UpdateTaskProps {
	task: Task;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	purpose?: string; // 'table' or 'board' to refetch only specific queries
}

function UpdateTask({ task, open, onOpenChange, purpose }: UpdateTaskProps) {
	const { mutate: updateTask, isPending } = useUpdateTask(purpose);
	const { mutate: deleteAsset, isPending: isDeletingAsset } = useDeleteTaskAsset();
	const [addAssetIds, setAddAssetIds] = useState<string[]>([]);

	const { data: users } = useGetUsers(open ? { page: 1, limit: 100 } : undefined);
	const userOptions = useMemo(
		() =>
			(users?.data.data ?? []).map((user) => ({
				label:
					user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username,
				value: user.id,
			})),
		[users?.data.data]
	);

	const [taskSearch, setTaskSearch] = useState('');

	const { data: tasksResponse, isFetching: isFetchingTasks } = useGetTasks(
		open ? { page: 1, limit: 20, title: taskSearch || undefined } : undefined,
		'dropdown'
	);
	const taskOptions = useMemo(
		() =>
			(tasksResponse?.data.data ?? [])
				.filter((t) => t.id !== task.id)
				.map((t) => ({
					taskKey: t.taskKey,
					title: t.title,
					id: t.id,
				})),
		[tasksResponse?.data.data, task.id]
	);

	const form = useForm<TaskUpdateSchema>({
		resolver: zodResolver(taskUpdateSchema()),
		defaultValues: {
			title: '',
			description: '',
			status: undefined,
			priority: undefined,
			workType: 'task',
			projectId: undefined,
			assigneeId: undefined,
			linkedTaskUrls: [],
			estimate: undefined,
			deadline: '',
		},
	});

	useEffect(() => {
		if (task && open) {
			// Convert linkedTasks to linkedTaskUrls
			const linkedTaskUrls = task.linkedTasks?.map((lt) => lt.url) || [];

			form.reset({
				title: task.title,
				description: task.description || '',
				status: task.status,
				priority: task.priority,
				workType: task.workType,
				projectId: task.project?.id || undefined,
				assigneeId: task.assignee?.id || undefined,
				linkedTaskUrls,
				estimate: task.estimate,
				deadline: task.deadline ? new Date(task.deadline).toISOString() : '',
			});

			// Reset file states
			setAddAssetIds([]);
		} else if (!open) {
			// Reset search when modal closes
			setTaskSearch('');
			setAddAssetIds([]);
		}
	}, [task, open, form]);

	function onSubmit(data: TaskUpdate) {
		const updateData: TaskUpdate = {
			...data,
			addAssetIds: addAssetIds.length > 0 ? addAssetIds : undefined,
		};

		updateTask(
			{ id: task.id, data: updateData },
			{
				onSuccess: (response) => {
					toast.success(response?.message || 'Task updated successfully');
					setAddAssetIds([]);
					onOpenChange(false);
				},
				onError: (error) => {
					toast.error(error.message || 'Failed to update task');
				},
			}
		);
	}

	const handleRemoveExistingAsset = (assetId: string) => {
		deleteAsset(
			{ assetId },
			{
				onSuccess: (response) => {
					toast.success(response?.message || 'File deleted successfully');
				},
				onError: (error) => {
					toast.error(error.message || 'Failed to delete file');
				},
			}
		);
	};

	return (
		<Modal open={open} onOpenChange={onOpenChange}>
			<ModalContent className="max-h-[90vh] w-full md:min-w-4xl!">
				<ModalHeader>
					<ModalTitle>Update Task</ModalTitle>
					<ModalDescription>
						Update task information. Modify the fields below and save changes.
					</ModalDescription>
				</ModalHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-1 flex-col overflow-hidden"
					>
						<ModalBody className="space-y-4 overflow-y-auto">
							{/* Task Information Section */}
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Title</FormLabel>
										<FormControl>
											<Input inputSize="md" placeholder="Enter task title" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Enter task description (optional)"
												className="max-h-40 min-h-24 resize-y overflow-y-auto"
												onKeyDown={(e) => {
													if (e.key === ' ' || e.key === 'Enter' || e.key === 'Tab') {
														e.stopPropagation();
													}
												}}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem>
											<FormLabel required>Status</FormLabel>
											<Select onValueChange={field.onChange} value={field.value}>
												<FormControl>
													<SelectTrigger className="w-full" size="md">
														<SelectValue placeholder="Select status" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{TaskStatusOptions.map((option) => (
														<SelectItem key={option.value} value={option.value}>
															<StatusBadge status={option.value} size="xs" showIcon={false} />
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="priority"
									render={({ field }) => (
										<FormItem>
											<FormLabel required>Priority</FormLabel>
											<Select onValueChange={field.onChange} value={field.value}>
												<FormControl>
													<SelectTrigger className="w-full" size="md">
														<SelectValue placeholder="Select priority" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{TaskPriorityOptions.map((option) => (
														<SelectItem key={option.value} value={option.value}>
															<PriorityBadge priority={option.value} size="xs" showIcon={false} />
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="workType"
									render={({ field }) => (
										<FormItem>
											<FormLabel required>Work Type</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="w-full" size="md">
														<SelectValue placeholder="Select work type" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{TaskWorkTypeOptions.map((option) => (
														<SelectItem key={option.value} value={option.value}>
															{option.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<FormField
									control={form.control}
									name="estimate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Estimate (hours)</FormLabel>
											<FormControl>
												<Input
													inputSize="md"
													type="number"
													step="0.5"
													min="0"
													max="999.99"
													placeholder="e.g., 8.5"
													{...field}
													value={field.value ?? ''}
													onChange={(e) => {
														const value = e.target.value;
														field.onChange(value === '' ? undefined : Number.parseFloat(value));
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="deadline"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Deadline</FormLabel>
											<FormControl>
												<DateTimePicker
													date={field.value ? new Date(field.value) : undefined}
													onDateSelect={(date) => {
														field.onChange(date ? date.toISOString() : '');
													}}
													placeholder="Select deadline"
													size="md"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="assigneeId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Assignee</FormLabel>
											<Select onValueChange={field.onChange} value={field.value}>
												<FormControl>
													<SelectTrigger className="w-full" size="md">
														<SelectValue placeholder="Select assignee" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{userOptions.map((user) => (
														<SelectItem key={user.value} value={user.value}>
															{user.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Separator />

							{/* Assignment & Relations Section */}
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="linkedTaskUrls"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Related Task URLs</FormLabel>
											<FormControl>
												<UrlArrayInput
													value={field.value}
													onChange={field.onChange}
													placeholder="Or paste URL manually"
													maxUrls={20}
													tasks={taskOptions}
													baseUrl="https://teamflow.it-forelead.uz/tasks/"
													onSearchChange={setTaskSearch}
													isLoadingTasks={isFetchingTasks}
												/>
											</FormControl>
											<FormDescription>
												Select tasks from the list or paste URLs manually
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Separator />

							{/* File Management Section */}
							<div className="space-y-4">
								{/* Existing Attachments */}
								{task.assets && task.assets.length > 0 && (
									<div className="space-y-2">
										<FormLabel>Existing Attachments</FormLabel>
										<FormDescription>
											Current files attached to this task. Click to open or delete files.
										</FormDescription>
										<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
											{task.assets.map((asset) => (
												<div
													key={asset.id}
													className="group flex items-center justify-between rounded-md border bg-muted/50 p-3 transition-colors hover:bg-muted"
												>
													<a
														href={asset.url}
														target="_blank"
														rel="noopener noreferrer"
														className="min-w-0 flex-1 text-left"
													>
														<p className="truncate font-medium text-sm transition-colors group-hover:text-primary">
															{asset.asset.fileName}
														</p>
														<p className="text-muted-foreground text-xs">
															{asset.asset.contentType}
														</p>
													</a>
													<div className="ml-2 flex items-center gap-1">
														<Button
															type="button"
															variant="ghost"
															size="sm"
															onClick={() =>
																window.open(asset.url, '_blank', 'noopener,noreferrer')
															}
															className="h-8 w-8 p-0"
														>
															<ExternalLinkIcon className="h-4 w-4" />
														</Button>
														<Button
															type="button"
															variant="ghost"
															size="sm"
															onClick={() => handleRemoveExistingAsset(asset.id)}
															disabled={isDeletingAsset}
															className="h-8 w-8 p-0 text-destructive hover:text-destructive"
														>
															<Trash2Icon className="h-4 w-4" />
														</Button>
													</div>
												</div>
											))}
										</div>
									</div>
								)}

								{/* Upload New Files */}
								<div className="space-y-2">
									<FormLabel>Add New Attachments</FormLabel>
									<FormDescription>
										Upload additional files to this task (images, PDF, Excel, CSV, Markdown)
									</FormDescription>
									<FileUploader
										mode="multiple"
										onAssetIdsChange={setAddAssetIds}
										onUploadComplete={(ids) => {
											console.log('Upload complete, new asset IDs:', ids);
										}}
										onUploadError={(error) => {
											toast.error(error.message || 'Failed to upload files');
										}}
										maxFiles={10}
										maxSize={10 * 1024 * 1024}
										autoUpload
										dropzoneClassName="w-full"
									/>
								</div>
							</div>
						</ModalBody>

						<ModalFooter className="flex-col gap-2 sm:flex-row">
							<Button
								type="button"
								size="md"
								variant="outline"
								onClick={() => onOpenChange(false)}
								disabled={isPending}
								className="w-full sm:w-auto"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								size="md"
								variant="primary"
								disabled={isPending}
								className="w-full sm:w-auto"
							>
								{isPending ? 'Updating...' : 'Update Task'}
							</Button>
						</ModalFooter>
					</form>
				</Form>
			</ModalContent>
		</Modal>
	);
}

// Default export for lazy loading
export default UpdateTask;

// Named export for direct imports (e.g., TaskDetailModal)
export { UpdateTask };
