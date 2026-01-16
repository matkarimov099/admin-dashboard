import { z } from 'zod';

/**
 * Schema for TIF Legal Entity (Receiver) form validation
 * Used in the TIFCatalogModal for adding/editing legal entity receivers
 */
export const tifLegalEntitySchema = z.object({
  stir: z.string().min(1, 'STIR field is required'),
  ktut: z.string().optional(),
  district: z.string().optional(),
  districtCode: z.string().optional(),
  name: z.string().min(1, 'Name field is required'),
  address: z.string().min(1, 'Address field is required'),
  additionalInfo: z.string().optional(),
  director: z.string().optional(),
  oked: z.string().optional(),
  ndsCode: z.string().optional(),
  phone: z.string().min(1, 'Phone field is required'),
  regNo: z.string().optional(),
  registrationDate: z.string().optional(),
  settlementAccount: z.string().optional(),
  settlementBankMfo: z.string().optional(),
  currencyAccount: z.string().optional(),
  currencyBankMfo: z.string().optional(),
});

export type TIFLegalEntitySchema = z.infer<typeof tifLegalEntitySchema>;
