import countryData from '@/data/country.json';

// ============================================================================
// Types
// ============================================================================

export interface LocalizedItem {
  code: string;
  name: string;
  order?: string;
}

export interface CountryItem extends LocalizedItem {
  countryId: string;
}

export interface CountryRaw {
  order: string;
  code: string;
  countryId: string;
  name: string;
  language: string;
}

// ============================================================================
// Language mapping: i18n -> JSON language code
// ============================================================================

const LANGUAGE_MAP: Record<string, string> = {
  en: 'GB',
  ru: 'RU',
  uz: 'OZ', // Uzbek Latin
  uzcyrl: 'UZ', // Uzbek Cyrillic
};

// ============================================================================
// Helper functions
// ============================================================================

/**
 * Get localized countries sorted by order
 */
export function getLocalizedCountries(locale: string): CountryItem[] {
  const language = LANGUAGE_MAP[locale] || 'GB';

  return (countryData as CountryRaw[])
    .filter((item: CountryRaw) => item.language === language)
    .map((item: CountryRaw) => ({
      code: item.code,
      countryId: item.countryId,
      name: item.name,
      order: item.order,
    }))
    .sort((a, b) => parseInt(a.order || '0', 10) - parseInt(b.order || '0', 10));
}
