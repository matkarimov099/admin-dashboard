import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import {
  type UploadAssetResponse,
  type UploadAssetsResponse,
  uploadAsset,
  uploadAssets,
} from '@/services/upload.service';

/**
 * Hook for uploading a single file
 * @returns Mutation hook for single file upload
 *
 * @example
 * const { mutate, isPending, data } = useUploadAsset();
 *
 * mutate(file, {
 *   onSuccess: (data) => {
 *     console.log('Asset ID:', data.id);
 *   },
 * });
 */
export function useUploadAsset(
  options?: Omit<UseMutationOptions<UploadAssetResponse, Error, File>, 'mutationFn'>
) {
  return useMutation<UploadAssetResponse, Error, File>({
    mutationFn: uploadAsset,
    ...options,
  });
}

/**
 * Hook for uploading multiple files
 * @returns Mutation hook for multiple file upload
 *
 * @example
 * const { mutate, isPending, data } = useUploadAssets();
 *
 * mutate(files, {
 *   onSuccess: (data) => {
 *     const assetIds = data.data.map(asset => asset.id);
 *     console.log('Asset IDs:', assetIds);
 *   },
 * });
 */
export function useUploadAssets(
  options?: Omit<UseMutationOptions<UploadAssetsResponse, Error, File[]>, 'mutationFn'>
) {
  return useMutation<UploadAssetsResponse, Error, File[]>({
    mutationFn: uploadAssets,
    ...options,
  });
}
