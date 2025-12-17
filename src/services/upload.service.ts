import axiosClient from '@/plugins/axios.ts';

/**
 * Upload asset response type
 * Backend returns only the asset ID
 */
export interface UploadAssetResponse {
  id: string;
}

/**
 * Upload multiple assets response type
 * This is a client-side transformation - collects all IDs from individual uploads
 */
export interface UploadAssetsResponse {
  ids: string[];
}

/**
 * Upload a single file to the assets endpoint
 * @param file - File to upload
 * @returns Promise with backend response { id: string }
 */
export async function uploadAsset(file: File): Promise<UploadAssetResponse> {
  const formData = new FormData();
  formData.append('file', file);

  console.log('Uploading single file:', file.name, file.type, file.size);

  const { data } = await axiosClient.post<UploadAssetResponse>('/assets', formData);

  console.log('Upload response:', data);
  return data; // Backend returns: { id: string }
}

/**
 * Upload multiple files to the assets endpoint
 * Uploads each file separately and collects all asset IDs
 * @param files - Array of files to upload
 * @returns Promise with transformed response { ids: string[] }
 *
 * @example
 * // Backend returns for each file: { id: "abc-123" }
 * // This function transforms to: { ids: ["abc-123", "def-456", ...] }
 */
export async function uploadAssets(files: File[]): Promise<UploadAssetsResponse> {
  console.log('Uploading', files.length, 'files to /assets endpoint...');

  // Upload each file individually
  const uploadPromises = files.map(file => uploadAsset(file));
  const results = await Promise.all(uploadPromises);

  // Collect all IDs from individual responses
  const ids = results.map(result => result.id);

  console.log('All uploads complete. Asset IDs:', ids);

  return { ids }; // Transform to { ids: string[] }
}
