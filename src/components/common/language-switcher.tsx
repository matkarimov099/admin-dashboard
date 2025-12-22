import { useTranslation } from 'react-i18next';
import enFlag from '@/assets/en.svg';
import ruFlag from '@/assets/ru.svg';
import uzFlag from '@/assets/uz.svg';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/utils/utils';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: enFlag },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: ruFlag },
  { code: 'uz', name: 'Uzbek (Latin)', nativeName: "O'zbekcha", flag: uzFlag },
  { code: 'uzcyrl', name: 'Uzbek (Cyrillic)', nativeName: 'Ўзбекча', flag: uzFlag },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage =
    languages.find(lang => lang.code === (i18n.resolvedLanguage || i18n.language)) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode).then();
    // Save language preference to localStorage
    localStorage.setItem('lang', langCode);
  };

  return (
    <div className="relative z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="group relative mr-2 h-9 w-9 overflow-hidden bg-card p-0 backdrop-blur-sm transition-all duration-200 hover:border-(--color-primary)/30 hover:bg-card/80 hover:backdrop-blur-md"
          >
            <div className="relative flex h-full w-full items-center justify-center">
              {/* Flag icon with rotation animation */}
              <img
                src={currentLanguage?.flag}
                alt={currentLanguage?.nativeName || 'Language'}
                className={cn(
                  'h-5! w-5! rounded-sm object-cover transition-transform duration-200 group-hover:scale-110'
                )}
              />
            </div>
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          {languages.map(language => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={cn(
                'group relative mx-1 my-0.5 flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2 transition-colors duration-200 hover:bg-muted/80',
                (i18n.resolvedLanguage || i18n.language) === language.code &&
                  'bg-(--color-primary)/10 text-foreground'
              )}
            >
              <div className="flex flex-1 items-center gap-3">
                <img
                  src={language.flag}
                  alt={language.nativeName}
                  className="h-4 w-4 rounded-sm object-cover"
                />
                <span className="font-medium text-sm">{language.nativeName}</span>
              </div>
              {/*{(i18n.resolvedLanguage || i18n.language) === language.code && (*/}
              {/*  <CheckIcon className="h-4 w-4" />*/}
              {/*)}*/}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
