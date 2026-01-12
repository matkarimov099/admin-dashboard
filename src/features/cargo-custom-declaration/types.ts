export type DeclarationType = 'IM' | 'EKS' | 'TR';

export interface DeclarationHeader {
  declarationNumber?: string;
  declarationType: DeclarationType;
  typeCode: string;
  additionalSheet: number;
  specialDispatch: number;
  totalItemsNamed: number;
  totalPlaces: number;
  referenceNumber: string;
  referenceDate: Date;
  currentPage: number;
}

export interface PartyDetails {
  name: string;
  inn?: string;
  pinfl?: string;
  address?: string;
  phone?: string;
}

export interface TransportDetails {
  vehicleNumber?: string;
  vehicleType?: string;
  driverName?: string;
  driverLicense?: string;
}

export interface TransportAtBorder {
  vehicleType?: string;
  vehicleNumber?: string;
  containerNumber?: string;
  isContainer: boolean;
}

export interface CustomsAtBorder {
  customsCode?: string;
  customsName?: string;
}

export interface DeliveryTerms {
  incoterms?: string;
  tradingCountry?: string;
  totalCustomsValue: number;
}

export interface CountryDetails {
  departureCountry?: string;
  departureCountryCode?: string;
  destinationCountry?: string;
  destinationCountryCode?: string;
}

export interface CurrencyDetails {
  currencyCode?: string;
  invoiceAmount: number;
  exchangeRate: number;
  transactionType?: string;
}

export interface LocationDetails {
  goodsLocation?: string;
}

export interface FinancialDetails {
  bankDetails?: string;
  paymentInfo?: string;
}

export interface PaymentDetails {
  defermentDate?: Date;
}

export interface WarehouseDetails {
  warehouseName?: string;
  kntNumber?: string;
}

export interface GoodsItem {
  itemNumber: number;
  description: string;
  hsCode?: string;
  countryOfOrigin?: string;
  grossWeight?: number;
  netWeight?: number;
  quantity?: number;
  unit?: string;
  invoiceValue?: number;
  statisticalValue?: number;
}

export interface AutoTransportDeclaration {
  header: DeclarationHeader;
  exporter: PartyDetails;
  importer: PartyDetails;
  declarant?: PartyDetails;
  financialResponsible?: PartyDetails;
  transport: TransportDetails;
  transportAtBorder: TransportAtBorder;
  customsAtBorder: CustomsAtBorder;
  deliveryTerms: DeliveryTerms;
  countryDetails: CountryDetails;
  currencyDetails: CurrencyDetails;
  locationDetails?: LocationDetails;
  financialDetails?: FinancialDetails;
  paymentDetails?: PaymentDetails;
  warehouseDetails?: WarehouseDetails;
  goods: GoodsItem[];
}

export interface AutoTransportDeclarationFormData extends Omit<AutoTransportDeclaration, 'goods'> {
  goods: GoodsItem[];
}

// Exporter types for Exporter Catalog
export interface Exporter {
  id: string;
  nameAndAddress: string;
  country: string;
}

// Sender types for Sender Catalog
export interface Sender {
  id: string;
  name: string;
  address: string;
  country: string;
  additionalInfo?: string;
}
