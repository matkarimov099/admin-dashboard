import { z } from 'zod';

/**
 * Schema for Importer form validation
 * Used in the ImporterCatalogModal for adding/editing importers
 */
export const importerSchema = z.object({
  ktut: z.string().optional(),
  stir: z.string().optional(),
  nameAndAddress: z.string().min(1, 'Name and address field is required'),
});

export type ImporterSchema = z.infer<typeof importerSchema>;
