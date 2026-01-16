import { z } from 'zod';

/**
 * Schema for TIF Individual Person (Receiver) form validation
 * Used in the TIFCatalogModal for adding/editing individual person receivers
 */
export const tifIndividualSchema = z.object({
  pinfl: z.string().min(1, 'PINFL field is required'),
  district: z.string().optional(),
  districtCode: z.string().optional(),
  patentNumber: z.string().optional(),
  fullName: z.string().min(1, 'Full name field is required'),
  address: z.string().min(1, 'Address field is required'),
  additionalInfo: z.string().optional(),
  phone: z.string().min(1, 'Phone field is required'),
  passportNumber: z.string().min(1, 'Passport number field is required'),
  issueDate: z.string().min(1, 'Issue date field is required'),
  issuedBy: z.string().min(1, 'Issued by field is required'),
  settlementAccount: z.string().optional(),
  settlementBankMfo: z.string().optional(),
  currencyAccount: z.string().optional(),
  currencyBankMfo: z.string().optional(),
});

export type TIFIndividualSchema = z.infer<typeof tifIndividualSchema>;
