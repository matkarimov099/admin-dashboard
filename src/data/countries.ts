export interface Country {
  code: string;
  name: string;
  nameUz?: string;
  nameRu?: string;
}

export const countries: Country[] = [
  { code: 'UZ', name: 'Uzbekistan', nameUz: 'Oʻzbekiston', nameRu: 'Узбекистан' },
  { code: 'AF', name: 'Afghanistan', nameUz: 'Afgʻoniston', nameRu: 'Афганистан' },
  { code: 'KZ', name: 'Kazakhstan', nameUz: 'Qozogʻiston', nameRu: 'Казахстан' },
  { code: 'KG', name: 'Kyrgyzstan', nameUz: 'Qirgʻiziston', nameRu: 'Кыргызстан' },
  { code: 'TJ', name: 'Tajikistan', nameUz: 'Tojikiston', nameRu: 'Таджикистан' },
  { code: 'TM', name: 'Turkmenistan', nameUz: 'Turkmaniston', nameRu: 'Туркменистан' },
  { code: 'CN', name: 'China', nameUz: 'Xitoy', nameRu: 'Китай' },
  { code: 'RU', name: 'Russia', nameUz: 'Rossiya', nameRu: 'Россия' },
  { code: 'TR', name: 'Turkey', nameUz: 'Turkiya', nameRu: 'Турция' },
  { code: 'IR', name: 'Iran', nameUz: 'Eron', nameRu: 'Иран' },
  { code: 'PK', name: 'Pakistan', nameUz: 'Pokiston', nameRu: 'Пакистан' },
  { code: 'IN', name: 'India', nameUz: 'Hindiston', nameRu: 'Индия' },
  { code: 'AE', name: 'United Arab Emirates', nameUz: 'Birlashgan Arab Amirliklari', nameRu: 'ОАЭ' },
  { code: 'SA', name: 'Saudi Arabia', nameUz: 'Saudiya Arabistoni', nameRu: 'Саудовская Аравия' },
  { code: 'DE', name: 'Germany', nameUz: 'Germaniya', nameRu: 'Германия' },
  { code: 'IT', name: 'Italy', nameUz: 'Italiya', nameRu: 'Италия' },
  { code: 'FR', name: 'France', nameUz: 'Fransiya', nameRu: 'Франция' },
  { code: 'GB', name: 'United Kingdom', nameUz: 'Buyuk Britaniya', nameRu: 'Великобритания' },
  { code: 'US', name: 'United States', nameUz: 'AQSh', nameRu: 'США' },
  { code: 'JP', name: 'Japan', nameUz: 'Yaponiya', nameRu: 'Япония' },
  { code: 'KR', name: 'South Korea', nameUz: 'Janubiy Koreya', nameRu: 'Южная Корея' },
  { code: 'UA', name: 'Ukraine', nameUz: 'Ukraina', nameRu: 'Украина' },
  { code: 'BY', name: 'Belarus', nameUz: 'Belarus', nameRu: 'Беларусь' },
  { code: 'AZ', name: 'Azerbaijan', nameUz: 'Ozarbayjon', nameRu: 'Азербайджан' },
  { code: 'GE', name: 'Georgia', nameUz: 'Gruziya', nameRu: 'Грузия' },
  { code: 'AM', name: 'Armenia', nameUz: 'Armaniston', nameRu: 'Армения' },
  { code: 'PL', name: 'Poland', nameUz: 'Polsha', nameRu: 'Польша' },
  { code: 'NL', name: 'Netherlands', nameUz: 'Niderlandiya', nameRu: 'Нидерланды' },
  { code: 'BE', name: 'Belgium', nameUz: 'Belgiya', nameRu: 'Бельгия' },
  { code: 'ES', name: 'Spain', nameUz: 'Ispaniya', nameRu: 'Испания' },
  { code: 'PT', name: 'Portugal', nameUz: 'Portugaliya', nameRu: 'Португалия' },
  { code: 'CH', name: 'Switzerland', nameUz: 'Shveytsariya', nameRu: 'Швейцария' },
  { code: 'AT', name: 'Austria', nameUz: 'Avstriya', nameRu: 'Австрия' },
  { code: 'SE', name: 'Sweden', nameUz: 'Shvetsiya', nameRu: 'Швеция' },
  { code: 'NO', name: 'Norway', nameUz: 'Norvegiya', nameRu: 'Норвегия' },
  { code: 'DK', name: 'Denmark', nameUz: 'Daniya', nameRu: 'Дания' },
  { code: 'FI', name: 'Finland', nameUz: 'Finlandiya', nameRu: 'Финляндия' },
  { code: 'CZ', name: 'Czech Republic', nameUz: 'Chexiya', nameRu: 'Чехия' },
  { code: 'SK', name: 'Slovakia', nameUz: 'Slovakiya', nameRu: 'Словакия' },
  { code: 'HU', name: 'Hungary', nameUz: 'Vengriya', nameRu: 'Венгрия' },
  { code: 'RO', name: 'Romania', nameUz: 'Ruminiya', nameRu: 'Румыния' },
  { code: 'BG', name: 'Bulgaria', nameUz: 'Bolgariya', nameRu: 'Болгария' },
  { code: 'GR', name: 'Greece', nameUz: 'Gretsiya', nameRu: 'Греция' },
  { code: 'CA', name: 'Canada', nameUz: 'Kanada', nameRu: 'Канада' },
  { code: 'AU', name: 'Australia', nameUz: 'Avstraliya', nameRu: 'Австралия' },
  { code: 'NZ', name: 'New Zealand', nameUz: 'Yangi Zelandiya', nameRu: 'Новая Зеландия' },
  { code: 'BR', name: 'Brazil', nameUz: 'Braziliya', nameRu: 'Бразилия' },
  { code: 'AR', name: 'Argentina', nameUz: 'Argentina', nameRu: 'Аргентина' },
  { code: 'MX', name: 'Mexico', nameUz: 'Meksika', nameRu: 'Мексика' },
  { code: 'ZA', name: 'South Africa', nameUz: 'Janubiy Afrika', nameRu: 'Южная Африка' },
  { code: 'EG', name: 'Egypt', nameUz: 'Misr', nameRu: 'Египет' },
  { code: 'IL', name: 'Israel', nameUz: 'Isroil', nameRu: 'Израиль' },
  { code: 'TH', name: 'Thailand', nameUz: 'Tailand', nameRu: 'Таиланд' },
  { code: 'VN', name: 'Vietnam', nameUz: 'Vyetnam', nameRu: 'Вьетнам' },
  { code: 'MY', name: 'Malaysia', nameUz: 'Malayziya', nameRu: 'Малайзия' },
  { code: 'ID', name: 'Indonesia', nameUz: 'Indoneziya', nameRu: 'Индонезия' },
  { code: 'PH', name: 'Philippines', nameUz: 'Filippin', nameRu: 'Филиппины' },
  { code: 'SG', name: 'Singapore', nameUz: 'Singapur', nameRu: 'Сингапур' },
  { code: 'HK', name: 'Hong Kong', nameUz: 'Gonkong', nameRu: 'Гонконг' },
  { code: 'BD', name: 'Bangladesh', nameUz: 'Bangladesh', nameRu: 'Бангладеш' },
  { code: 'LK', name: 'Sri Lanka', nameUz: 'Shri Lanka', nameRu: 'Шри-Ланка' },
  { code: 'NP', name: 'Nepal', nameUz: 'Nepal', nameRu: 'Непал' },
  { code: 'MM', name: 'Myanmar', nameUz: 'Myanma', nameRu: 'Мьянма' },
  { code: 'LA', name: 'Laos', nameUz: 'Laos', nameRu: 'Лаос' },
  { code: 'KH', name: 'Cambodia', nameUz: 'Kambodja', nameRu: 'Камбоджа' },
  { code: 'MV', name: 'Maldives', nameUz: 'Maldiv orollari', nameRu: 'Мальдивы' },
  { code: 'MN', name: 'Mongolia', nameUz: 'Mongoliya', nameRu: 'Монголия' },
  { code: 'KP', name: 'North Korea', nameUz: 'Shimoliy Koreya', nameRu: 'Северная Корея' },
];

// Helper function to get country name by locale
export function getCountryName(country: Country, locale: string = 'en'): string {
  switch (locale) {
    case 'uz':
      return country.nameUz || country.name;
    case 'ru':
      return country.nameRu || country.name;
    default:
      return country.name;
  }
}

// Helper function to get countries formatted for CountryPopover
export function getCountriesForPopover(locale: string = 'en') {
  return countries.map(c => ({
    code: c.code,
    name: getCountryName(c, locale),
  }));
}
