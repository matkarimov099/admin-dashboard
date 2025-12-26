import { z } from 'zod';

export const partyDetailsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  inn: z.string().optional(),
  pinfl: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});

export const transportDetailsSchema = z.object({
  vehicleNumber: z.string().optional(),
  vehicleType: z.string().optional(),
  driverName: z.string().optional(),
  driverLicense: z.string().optional(),
});

export const transportAtBorderSchema = z.object({
  vehicleType: z.string().optional(),
  vehicleNumber: z.string().optional(),
  containerNumber: z.string().optional(),
  isContainer: z.boolean().default(false),
});

export const customsAtBorderSchema = z.object({
  customsCode: z.string().optional(),
  customsName: z.string().optional(),
});

export const deliveryTermsSchema = z.object({
  incoterms: z.string().optional(),
  tradingCountry: z.string().optional(),
  totalCustomsValue: z.number().min(0),
});

export const countryDetailsSchema = z.object({
  departureCountry: z.string().optional(),
  departureCountryCode: z.string().optional(),
  destinationCountry: z.string().optional(),
  destinationCountryCode: z.string().optional(),
});

export const currencyDetailsSchema = z.object({
  currencyCode: z.string().optional(),
  invoiceAmount: z.number().min(0),
  exchangeRate: z.number().min(0),
  transactionType: z.string().optional(),
});

export const locationDetailsSchema = z.object({
  goodsLocation: z.string().optional(),
});

export const financialDetailsSchema = z.object({
  bankDetails: z.string().optional(),
  paymentInfo: z.string().optional(),
});

export const paymentDetailsSchema = z.object({
  defermentDate: z.date().optional(),
});

export const warehouseDetailsSchema = z.object({
  warehouseName: z.string().optional(),
  kntNumber: z.string().optional(),
});

export const goodsItemSchema = z.object({
  itemNumber: z.number().int().positive(),
  description: z.string().min(1, 'Description is required'),
  hsCode: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  grossWeight: z.number().min(0).optional(),
  netWeight: z.number().min(0).optional(),
  quantity: z.number().min(0).optional(),
  unit: z.string().optional(),
  invoiceValue: z.number().min(0).optional(),
  statisticalValue: z.number().min(0).optional(),
});

export const declarationHeaderSchema = z.object({
  declarationNumber: z.string().optional(),
  declarationType: z.enum(['IM', 'EKS', 'TR']).default('IM'),
  typeCode: z.string().default('40'),
  version: z.enum(['working', 'formatted', 'cancelled', 'draft']).default('draft'),
  additionalSheet: z.number().int().min(0).default(1),
  specialDispatch: z.number().int().min(0).default(1),
  totalItemsNamed: z.number().int().min(0).default(1),
  totalPlaces: z.number().int().min(0).default(0),
  referenceNumber: z.string().default(''),
  referenceDate: z.date().default(() => new Date()),
  currentPage: z.number().int().positive().default(1),
});

export const autoTransportDeclarationSchema = z.object({
  header: declarationHeaderSchema,
  exporter: partyDetailsSchema,
  importer: partyDetailsSchema,
  declarant: partyDetailsSchema.optional(),
  financialResponsible: partyDetailsSchema.optional(),
  transport: transportDetailsSchema,
  transportAtBorder: transportAtBorderSchema,
  customsAtBorder: customsAtBorderSchema,
  deliveryTerms: deliveryTermsSchema,
  countryDetails: countryDetailsSchema,
  currencyDetails: currencyDetailsSchema,
  locationDetails: locationDetailsSchema.optional(),
  financialDetails: financialDetailsSchema.optional(),
  paymentDetails: paymentDetailsSchema.optional(),
  warehouseDetails: warehouseDetailsSchema.optional(),
  goods: z.array(goodsItemSchema).min(1, 'At least one goods item is required'),
});

export type AutoTransportDeclarationSchema = z.infer<typeof autoTransportDeclarationSchema>;
