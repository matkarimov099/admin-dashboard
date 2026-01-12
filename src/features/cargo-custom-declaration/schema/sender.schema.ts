import { z } from 'zod';

/**
 * Schema for sender form validation
 * Used in the SenderCatalogModal for adding/editing senders
 */
export const senderSchema = z.object({
  name: z.string().min(1, 'Nomi maydoni toʻldirilishi shart').min(2, 'Nom kamida 2 ta belgidan iborat boʻlishi kerak'),
  address: z.string().min(1, 'Manzil maydoni toʻldirilishi shart').min(3, 'Manzil kamida 3 ta belgidan iborat boʻlishi kerak'),
  country: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export type SenderSchema = z.infer<typeof senderSchema>;
