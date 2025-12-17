import { DownloadIcon, FileIcon, Trash2Icon } from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { humanizeDateTime } from '@/utils/humanize.ts';
import 'react-photo-view/dist/react-photo-view.css';
import { toast } from 'sonner';
import { useDeleteTaskAsset } from '../../hooks/use-tasks';
import type { TaskAsset } from '../../types.ts';
import { isImageFile } from '../../utils/task-helpers.ts';

interface AttachmentsGridProps {
	taskId: string;
	assets: TaskAsset[];
}

interface AttachmentItemProps {
	taskId: string;
	asset: TaskAsset;
}

function AttachmentItem({ asset }: AttachmentItemProps) {
	const isImage = isImageFile(asset.asset.fileName);
	const { mutate: deleteAsset, isPending: isDeleting } = useDeleteTaskAsset();

	const handleDelete = () => {
		deleteAsset(
			{ assetId: asset.id },
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
		<div className="group relative w-fit overflow-hidden rounded-md border transition-all hover:shadow-md">
			{isImage ? (
				<PhotoView src={asset.url}>
					<div className="cursor-pointer">
						<div className="flex aspect-square items-center justify-center overflow-hidden bg-muted">
							<img
								src={asset.url}
								alt={asset.asset.fileName}
								className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
							/>
						</div>
						<div className="w-32 bg-background p-1">
							<Tooltip>
								<TooltipTrigger asChild>
									<Typography
										variant="caption"
										weight="medium"
										truncate
										className="line-clamp-none"
									>
										{asset.asset.fileName}
									</Typography>
								</TooltipTrigger>
								<TooltipContent>
									<Typography variant="small" weight="medium" className="max-w-xs break-words">
										{asset.asset.fileName}
									</Typography>
									<Typography variant="muted">
										Uploaded by {asset.uploadedBy.firstName} {asset.uploadedBy.lastName}
									</Typography>
									<Typography variant="muted">{humanizeDateTime(asset.uploadedAt)}</Typography>
								</TooltipContent>
							</Tooltip>
						</div>
					</div>
				</PhotoView>
			) : (
				<button
					type="button"
					className="w-full cursor-pointer text-left"
					onClick={() => window.open(asset.url, '_blank')}
				>
					<div className="flex aspect-square items-center justify-center bg-muted">
						<FileIcon className="h-8 w-8 text-muted-foreground" />
					</div>
					<div className="w-32 bg-background p-1">
						<Tooltip>
							<TooltipTrigger asChild>
								<Typography variant="caption" weight="medium" truncate className="line-clamp-none">
									{asset.asset.fileName}
								</Typography>
							</TooltipTrigger>
							<TooltipContent>
								<Typography variant="small" weight="medium" className="max-w-xs break-words">
									{asset.asset.fileName}
								</Typography>
								<Typography variant="muted" className="[&:not(:first-child)]:mt-0">
									Uploaded by {asset.uploadedBy.firstName} {asset.uploadedBy.lastName}
								</Typography>
								<Typography variant="muted" className="[&:not(:first-child)]:mt-0">
									{humanizeDateTime(asset.uploadedAt)}
								</Typography>
							</TooltipContent>
						</Tooltip>
					</div>
				</button>
			)}
			<div className="absolute top-1 right-1 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
				<Button
					size="icon"
					variant="secondary"
					className="h-6 w-6 shadow-sm"
					onClick={() => window.open(asset.url, '_blank')}
				>
					<DownloadIcon className="h-3 w-3" />
				</Button>
				<Button
					size="icon"
					variant="destructive"
					className="h-6 w-6 shadow-sm"
					onClick={handleDelete}
					disabled={isDeleting}
				>
					<Trash2Icon className="h-3 w-3" />
				</Button>
			</div>
		</div>
	);
}

export function AttachmentsGrid({ taskId, assets }: AttachmentsGridProps) {
	if (!assets || assets.length === 0) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
					<FileIcon className="h-4 w-4 sm:h-5 sm:w-5" />
					<Typography variant="label" className="[&:not(:first-child)]:mt-0">
						Attachments
					</Typography>
					<Typography variant="muted" className="[&:not(:first-child)]:mt-0">
						({assets.length})
					</Typography>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<PhotoProvider>
					<div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
						{assets.map((asset) => (
							<AttachmentItem key={asset.id} taskId={taskId} asset={asset} />
						))}
					</div>
				</PhotoProvider>
			</CardContent>
		</Card>
	);
}
