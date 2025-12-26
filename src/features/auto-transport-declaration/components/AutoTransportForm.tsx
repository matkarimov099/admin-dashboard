import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, TruckIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { RadioOptions } from '@/components/custom/radio-options';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/utils/utils.ts';
import {
  type AutoTransportDeclarationSchema,
  autoTransportDeclarationSchema,
} from '../schema/declaration.schema';

const defaultValues: AutoTransportDeclarationSchema = {
  header: {
    declarationType: 'IM',
    typeCode: '',
    version: 'draft',
    additionalSheet: 1,
    specialDispatch: 1,
    totalItemsNamed: 1,
    totalPlaces: 0,
    referenceNumber: '',
    referenceDate: new Date(),
    currentPage: 1,
  },
  exporter: {
    name: '',
  },
  importer: {
    name: '',
  },
  transport: {},
  transportAtBorder: {
    isContainer: false,
  },
  customsAtBorder: {},
  deliveryTerms: {
    totalCustomsValue: 0,
  },
  countryDetails: {},
  currencyDetails: {
    invoiceAmount: 0,
    exchangeRate: 0,
  },
  goods: [
    {
      itemNumber: 1,
      description: '',
    },
  ],
};

export function AutoTransportForm() {
  const form = useForm<AutoTransportDeclarationSchema>({
    resolver: zodResolver(autoTransportDeclarationSchema),
    defaultValues,
  });

  function onSubmit(values: AutoTransportDeclarationSchema) {
    console.log('Form submitted:', values);
    toast.success('Declaration saved successfully');
  }

  return (
    <div className="p-1 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TruckIcon className="size-6 text-primary" />
          <h1 className="font-bold text-md">Грузовая Таможенная Декларация</h1>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Section 1: Примечание, Radio Options, и Статус */}
          <Card className="p-4 sm:p-6">
            <div className="flex flex-wrap justify-between gap-4 md:flex-nowrap">
              <FormField
                control={form.control}
                name="header.declarationNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Примечание</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Введите примечание" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="header.typeCode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Статус декларация</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Статус танланг" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new">Новая</SelectItem>
                        <SelectItem value="reregistration">Перерегистрация</SelectItem>
                        <SelectItem value="redesign">Переоформления</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="header.version"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Версия</FormLabel>
                    <FormControl>
                      <RadioOptions
                        options={[
                          { value: 'working', label: 'Рабочая' },
                          { value: 'formatted', label: 'Оформленная' },
                          { value: 'cancelled', label: 'Аннулированная' },
                          { value: 'draft', label: 'Черновик' },
                        ]}
                        value={field.value}
                        onValueChange={field.onChange}
                        orientation="vertical"
                        name="version"
                        className="grid grid-cols-2 gap-2 lg:flex lg:flex-row"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Section 2: Декларация информация */}
          <Card className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="header.declarationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ГРУЗОВАЯ ТАМОЖЕННАЯ ДЕКЛАРАЦИЯ №</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Введите номер декларации" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="header.declarationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. Тип декларации</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип декларации" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EKS">Экспорт</SelectItem>
                        <SelectItem value="RE">Реэкспорт</SelectItem>
                        <SelectItem value="IM">Выпуск для свободного обращения (импорт)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Section 3: Экспортёр/Грузоотправитель */}
          <Card className="p-4 sm:p-6">
            <h3 className="mb-4 font-semibold text-base">2. Экспортёр/Грузоотправитель</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="exporter.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номи</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Введите название компании" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="exporter.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адрес</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Введите адрес компании" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="countryDetails.departureCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Мамлакат</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Мамлакат танланг" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="UZ">Узбекистан</SelectItem>
                        <SelectItem value="RU">Россия</SelectItem>
                        <SelectItem value="KZ">Казахстан</SelectItem>
                        <SelectItem value="CN">Китай</SelectItem>
                        <SelectItem value="TR">Турция</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="exporter.inn"
                render={({ field }) => (
                  <FormItem className="md:col-span-3">
                    <FormLabel>Қўшимча маълумот</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Введите дополнительную информацию"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" className="w-full sm:w-auto">
              Отмена
            </Button>
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              Сохранить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
