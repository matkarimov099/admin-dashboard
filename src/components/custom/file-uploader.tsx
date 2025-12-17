import {
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  Loader2Icon,
  TableIcon,
  UploadIcon,
  X,
} from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { useUploadAsset, useUploadAssets } from '@/hooks/use-upload';
import type { UploadAssetsResponse } from '@/services/upload.service';
import { cn } from '@/utils/utils';

export interface FileWithPreview {
  file: File;
  preview?: string;
  assetId?: string;
}

// Base props that are common to both modes
interface BaseFileUploaderProps {
  maxSize?: number; // in bytes
  accept?: string;
  disabled?: boolean;
  className?: string;
  dropzoneClassName?: string;
  showPreview?: boolean;
  autoUpload?: boolean; // Auto upload on file select (default: true)
  onUploadError?: (error: Error) => void;
}

// Single mode - uploads one file at a time
interface SingleFileUploaderProps extends BaseFileUploaderProps {
  mode: 'single';
  onAssetIdChange?: (assetId: string | undefined) => void;
  onUploadComplete?: (assetId: string) => void;
}

// Multiple mode - uploads multiple files
interface MultipleFileUploaderProps extends BaseFileUploaderProps {
  mode: 'multiple';
  maxFiles?: number;
  onAssetIdsChange?: (assetIds: string[]) => void;
  onUploadComplete?: (assetIds: string[]) => void;
}

type FileUploaderProps = SingleFileUploaderProps | MultipleFileUploaderProps;

const ACCEPTED_FILE_TYPES = {
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  pdf: ['application/pdf', '.pdf'],
  excel: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.xls',
    '.xlsx',
  ],
  csv: ['text/csv', '.csv'],
  markdown: ['text/markdown', 'text/plain', '.md'],
  text: ['text/plain', '.txt'],
  word: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.doc',
    '.docx',
  ],
};

const DEFAULT_ACCEPT = [
  ...ACCEPTED_FILE_TYPES.image,
  ...ACCEPTED_FILE_TYPES.pdf,
  ...ACCEPTED_FILE_TYPES.excel,
  ...ACCEPTED_FILE_TYPES.csv,
  ...ACCEPTED_FILE_TYPES.markdown,
  ...ACCEPTED_FILE_TYPES.text,
  ...ACCEPTED_FILE_TYPES.word,
].join(',');

export function FileUploader(props: FileUploaderProps) {
  const {
    mode,
    maxSize = 5 * 1024 * 1024, // 5MB default
    accept = DEFAULT_ACCEPT,
    disabled = false,
    className,
    dropzoneClassName,
    showPreview = true,
    autoUpload = true,
    onUploadError,
  } = props;

  const maxFiles = mode === 'single' ? 1 : (props.maxFiles ?? 5);

  const [files, setFiles] = React.useState<FileWithPreview[]>([]);
  const [assetId, setAssetId] = React.useState<string | undefined>(undefined);
  const [assetIds, setAssetIds] = React.useState<string[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Hooks for single and multiple uploads
  const { mutate: uploadSingleAsset, isPending: isSingleUploading } = useUploadAsset();
  const { mutate: uploadMultipleAssets, isPending: isMultipleUploading } = useUploadAssets();

  const isUploading = mode === 'single' ? isSingleUploading : isMultipleUploading;

  // Cleanup preview URLs on unmount
  React.useEffect(() => {
    return () => {
      for (const file of files) {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      }
    };
  }, [files]);

  // Notify parent when assetId changes (single mode)
  React.useEffect(() => {
    if (mode === 'single' && props.onAssetIdChange) {
      props.onAssetIdChange(assetId);
    }
  }, [assetId, mode, props]);

  // Notify parent when assetIds change (multiple mode)
  React.useEffect(() => {
    if (mode === 'multiple' && props.onAssetIdsChange) {
      props.onAssetIdsChange(assetIds);
    }
  }, [assetIds, mode, props]);

  const handleFiles = (newFiles: File[]) => {
    console.log('FileUploader: handleFiles called with', newFiles.length, 'files');
    if (disabled || isUploading) return;

    const validFiles: FileWithPreview[] = [];

    for (const file of newFiles) {
      console.log('FileUploader: Processing file:', file.name, file.type, file.size);

      // Check max files
      if (files.length + validFiles.length >= maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        break;
      }

      // Check file size
      if (file.size > maxSize) {
        alert(`File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`);
        continue;
      }

      // Check file type
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const isAccepted = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          const baseType = type.split('/')[0];
          return file.type.startsWith(`${baseType}/`);
        }
        return file.type === type;
      });

      if (!isAccepted) {
        console.log('FileUploader: File type not accepted:', file.type);
        alert(`File type "${file.type}" is not accepted`);
        continue;
      }

      // Create file wrapper with a preview for images
      const fileWithPreview: FileWithPreview = {
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      };

      validFiles.push(fileWithPreview);
    }

    console.log('FileUploader: Valid files:', validFiles.length);

    if (validFiles.length > 0) {
      // For single mode, replace an existing file
      const updatedFiles = mode === 'single' ? validFiles : [...files, ...validFiles];
      setFiles(updatedFiles);

      // Auto upload if enabled
      if (autoUpload) {
        if (mode === 'single') {
          // Single mode: upload one file
          console.log('FileUploader: Auto-uploading single file...');
          uploadSingleAsset(validFiles[0].file, {
            onSuccess: response => {
              console.log('FileUploader: Single upload successful:', response);
              setAssetId(response.id);

              // Update file with assetId
              const fileWithAssetId = { ...validFiles[0], assetId: response.id };
              setFiles([fileWithAssetId]);

              // Notify parent
              if (props.onUploadComplete) {
                props.onUploadComplete(response.id);
              }
            },
            onError: error => {
              console.error('FileUploader: Upload failed:', error);
              if (onUploadError) {
                onUploadError(error);
              }
              // Remove failed file
              setFiles([]);
              setAssetId(undefined);
            },
          });
        } else {
          // Multiple mode: upload multiple files
          console.log('FileUploader: Auto-uploading multiple files...');
          const filesToUpload = validFiles.map(f => f.file);
          uploadMultipleAssets(filesToUpload, {
            onSuccess: (response: UploadAssetsResponse) => {
              console.log('FileUploader: Multiple upload successful:', response);
              const newAssetIds = response.ids;
              const updatedAssetIds = [...assetIds, ...newAssetIds];
              setAssetIds(updatedAssetIds);

              // Update files with assetIds
              const filesWithAssetIds = updatedFiles.map((fileWrapper, index) => {
                if (index < newAssetIds.length) {
                  return { ...fileWrapper, assetId: newAssetIds[index] };
                }
                return fileWrapper;
              });
              setFiles(filesWithAssetIds);

              // Notify parent
              if (props.onUploadComplete) {
                props.onUploadComplete(updatedAssetIds);
              }
            },
            onError: error => {
              console.error('FileUploader: Upload failed:', error);
              if (onUploadError) {
                onUploadError(error);
              }
              // Remove failed files
              setFiles(files);
            },
          });
        }
      }
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    handleFiles(files);
    // Reset input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    const removedFile = newFiles.splice(index, 1)[0];

    // Cleanup preview URL
    if (removedFile?.preview) {
      URL.revokeObjectURL(removedFile.preview);
    }

    // Remove from assetId/assetIds
    if (mode === 'single') {
      setAssetId(undefined);
      setFiles([]);
    } else {
      if (removedFile.assetId) {
        const newAssetIds = assetIds.filter(id => id !== removedFile.assetId);
        setAssetIds(newAssetIds);
      }
      setFiles(newFiles);
    }
  };

  const openFileDialog = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Dropzone */}
      <button
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFileDialog();
          }
        }}
        type="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="File upload dropzone"
        className={cn(
          'relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors',
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
            : 'border-border hover:border-blue-400 hover:bg-accent/50',
          disabled && 'cursor-not-allowed opacity-50',
          dropzoneClassName
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={mode === 'multiple'}
          accept={accept}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
          aria-label="File upload"
        />

        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-primary/10 p-4">
            {isUploading ? (
              <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
            ) : (
              <UploadIcon className="h-8 w-8 text-primary" />
            )}
          </div>

          <div className="space-y-1">
            <p className="font-medium text-sm">
              {isUploading
                ? 'Uploading files...'
                : isDragging
                  ? 'Drop files here'
                  : 'Click to upload or drag and drop'}
            </p>
            <p className="text-muted-foreground text-xs">
              Images, PDF, Excel, CSV, Markdown (Max {formatFileSize(maxSize)})
            </p>
          </div>
        </div>
      </button>

      {/* File List */}
      {showPreview && files.length > 0 && (
        <div className="space-y-2">
          <p className="font-medium text-sm">
            Files ({files.length}/{maxFiles})
            {isUploading && (
              <span className="ml-2 text-muted-foreground text-xs">Uploading...</span>
            )}
          </p>
          <div className="grid grid-cols-1 gap-2">
            {files.map((fileWrapper, index) => (
              <FilePreview
                key={fileWrapper.assetId || `${fileWrapper.file.name}-${fileWrapper.file.size}`}
                file={fileWrapper}
                onRemove={() => handleRemoveFile(index)}
                disabled={disabled || isUploading}
                isUploading={isUploading && !fileWrapper.assetId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// File Preview Component
interface FilePreviewProps {
  file: FileWithPreview;
  onRemove: () => void;
  disabled?: boolean;
  isUploading?: boolean;
}

function FilePreview({ file, onRemove, disabled, isUploading }: FilePreviewProps) {
  const actualFile = file.file;
  const isImage = actualFile.type.startsWith('image/');
  const isPDF = actualFile.type === 'application/pdf' || actualFile.name.endsWith('.pdf');
  const isExcel =
    actualFile.type.includes('excel') ||
    actualFile.type.includes('spreadsheet') ||
    actualFile.name.endsWith('.xls') ||
    actualFile.name.endsWith('.xlsx');
  const isCSV = actualFile.type === 'text/csv' || actualFile.name.endsWith('.csv');
  const isMarkdown = actualFile.type.includes('markdown') || actualFile.name.endsWith('.md');
  const isTxt = actualFile.type === 'text/plain' || actualFile.name.endsWith('.txt');
  const isWord =
    actualFile.type === 'application/msword' ||
    actualFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    actualFile.name.endsWith('.doc') ||
    actualFile.name.endsWith('.docx');

  const getFileIcon = () => {
    if (isPDF) return <FileTextIcon className="h-8 w-8 text-red-500" />;
    if (isExcel) return <FileSpreadsheetIcon className="h-8 w-8 text-green-600" />;
    if (isCSV) return <TableIcon className="h-8 w-8 text-blue-500" />;
    if (isMarkdown) return <FileTextIcon className="h-8 w-8 text-purple-500" />;
    if (isTxt) return <FileTextIcon className="h-8 w-8 text-gray-500" />;
    if (isWord) return <FileTextIcon className="h-8 w-8 text-blue-600" />;
    return <FileIcon className="h-8 w-8 text-gray-500" />;
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50">
      {/* Preview or Icon */}
      <div className="flex-shrink-0">
        {isImage && file.preview ? (
          <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
            <img src={file.preview} alt={actualFile.name} className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
            {getFileIcon()}
          </div>
        )}
      </div>

      {/* File Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-sm" title={actualFile.name}>
          {actualFile.name}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-muted-foreground text-xs">{formatFileSize(actualFile.size)}</span>
          <span className="text-muted-foreground text-xs">•</span>
          <span className="text-muted-foreground text-xs capitalize">
            {getFileTypeLabel(actualFile.type, actualFile.name)}
          </span>
          {isUploading && (
            <>
              <span className="text-muted-foreground text-xs">•</span>
              <span className="flex items-center gap-1 text-blue-500 text-xs">
                <Loader2Icon className="h-3 w-3 animate-spin" />
                Uploading...
              </span>
            </>
          )}
          {file.assetId && !isUploading && (
            <>
              <span className="text-muted-foreground text-xs">•</span>
              <span className="text-green-500 text-xs">Uploaded</span>
            </>
          )}
        </div>
      </div>

      {/* Remove Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        disabled={disabled}
        className="h-8 w-8 flex-shrink-0"
        aria-label={`Remove ${actualFile.name}`}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Utility Functions
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

function getFileTypeLabel(type: string, name: string): string {
  if (type.startsWith('image/')) return 'Image';
  if (type === 'application/pdf' || name.endsWith('.pdf')) return 'PDF';
  if (
    type.includes('excel') ||
    type.includes('spreadsheet') ||
    name.endsWith('.xls') ||
    name.endsWith('.xlsx')
  )
    return 'Excel';
  if (type === 'text/csv' || name.endsWith('.csv')) return 'CSV';
  if (type.includes('markdown') || name.endsWith('.md')) return 'Markdown';
  return 'File';
}
