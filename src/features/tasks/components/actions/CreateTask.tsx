import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
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
import { DialogTrigger } from '@/components/ui/dialog';
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
import { useDisclosure } from '@/hooks/use-disclosure';
import { useCreateTask, useGetTasks } from '../../hooks/use-tasks';
import { type TaskCreateSchema, taskCreateSchema } from '../../schema/tasks.schema';
import type { TaskCreate } from '../../types';
import {
  TaskPriorityOptions,
  TaskStatus,
  TaskStatusOptions,
  TaskWorkTypeOptions,
} from '../../types';

interface CreateTaskProps {
  className?: string;
  initialStatus?: TaskStatus; // Initial status to pre-select
  triggerButton?: ReactNode; // Custom trigger button
}

function CreateTask({ className, initialStatus, triggerButton }: CreateTaskProps) {
  const { isOpen, onClose, onOpenChange } = useDisclosure();
  const { mutate: createTask, isPending } = useCreateTask();
  const [assetIds, setAssetIds] = useState<string[]>([]);

  const { data: users } = useGetUsers(isOpen ? { page: 1, limit: 100 } : undefined);
  const userOptions = useMemo(
    () =>
      (users?.data.data ?? []).map(user => ({
        label:
          user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username,
        value: user.id,
      })),
    [users?.data.data]
  );

  const [taskSearch, setTaskSearch] = useState('');

  const { data: tasksResponse, isFetching: isFetchingTasks } = useGetTasks(
    isOpen ? { page: 1, limit: 20, title: taskSearch || undefined } : undefined
  );
  const taskOptions = useMemo(
    () =>
      (tasksResponse?.data.data ?? []).map(task => ({
        taskKey: task.taskKey,
        title: task.title,
        id: task.id,
      })),
    [tasksResponse?.data.data]
  );

  const form = useForm<TaskCreateSchema>({
    resolver: zodResolver(taskCreateSchema()),
    defaultValues: {
      title: '',
      description: '',
      status: initialStatus || TaskStatus.TODO,
      priority: 'medium',
      workType: 'task',
      projectId: '',
      assigneeId: undefined,
      linkedTaskUrls: [],
      assetIds: [],
      estimate: undefined,
      deadline: '',
    },
  });

  // Reset form with initial status when modal opens
  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: '',
        description: '',
        status: initialStatus || TaskStatus.TODO,
        priority: 'medium',
        workType: 'task',
        projectId: '',
        assigneeId: undefined,
        linkedTaskUrls: [],
        assetIds: [],
        estimate: undefined,
        deadline: '',
      });
    } else {
      // Reset search when modal closes
      setTaskSearch('');
    }
  }, [isOpen, initialStatus, form]);

  function onSubmit(data: TaskCreate) {
    createTask(
      { ...data, assetIds: assetIds.length > 0 ? assetIds : undefined },
      {
        onSuccess: () => {
          // Close modal first to disable a query before invalidation
          onClose();
          setAssetIds([]);
          form.reset();
          toast.success('Task created successfully');
        },
        onError: error => {
          toast.error(error.message || 'Failed to create task');
        },
      }
    );
  }

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button
            leftIcon={<PlusIcon />}
            size="default"
            variant="primary"
            className={`flex- sm:w-auto sm:flex-initial w-full${className || ''}`}
          >
            Create Task
          </Button>
        )}
      </DialogTrigger>
      <ModalContent className="max-h-[90vh] w-full md:min-w-4xl!">
        <ModalHeader>
          <ModalTitle>Create New Task</ModalTitle>
          <ModalDescription>Fill in the task details below</ModalDescription>
        </ModalHeader>

        <Form {...form}>
          <form
            onSubmit={e => {
              form.handleSubmit(onSubmit)(e);
            }}
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
                          {TaskStatusOptions.map(option => (
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
                          {TaskPriorityOptions.map(option => (
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
                          {TaskWorkTypeOptions.map(option => (
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
                          onChange={e => {
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
                          onDateSelect={date => {
                            field.onChange(date?.toISOString() || '');
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
                          {userOptions.map(user => (
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

              {/* File Upload Section */}
              <div className="space-y-2">
                <FormLabel>Attachments</FormLabel>
                <FormDescription>
                  Upload files related to this task (images, PDF, Excel, CSV, Markdown)
                </FormDescription>
                <FileUploader
                  mode="multiple"
                  onAssetIdsChange={setAssetIds}
                  onUploadComplete={ids => {
                    console.log('Upload complete, asset IDs:', ids);
                  }}
                  onUploadError={error => {
                    toast.error(error.message || 'Failed to upload files');
                  }}
                  maxFiles={10}
                  maxSize={10 * 1024 * 1024}
                  autoUpload
                  dropzoneClassName="w-full"
                />
              </div>
            </ModalBody>

            <ModalFooter className="flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                size="md"
                variant="outline"
                onClick={onClose}
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
                {isPending ? 'Creating...' : 'Create Task'}
              </Button>
            </ModalFooter>
          </form>
        </Form>
      </ModalContent>
    </Modal>
  );
}

export default CreateTask;
export { CreateTask };
