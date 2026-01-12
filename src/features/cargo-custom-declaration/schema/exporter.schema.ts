import { z } from 'zod';

/**
 * Schema for exporter form validation
 * Used in the ExporterCatalogModal for adding/editing exporters
 */
export const exporterSchema = z.object({
  nameAndAddress: z
    .string()
    .min(1, 'Nomi va manzil maydoni toʻldirilishi shart')
    .min(3, 'Nomi va manzil kamida 3 ta belgidan iborat boʻlishi kerak'),
  country: z
    .string()
    .min(1, 'Davlat maydoni toʻldirilishi shart')
    .min(2, 'Davlat kodi kamida 2 ta belgidan iborat boʻlishi kerak'),
});

export type ExporterSchema = z.infer<typeof exporterSchema>;
