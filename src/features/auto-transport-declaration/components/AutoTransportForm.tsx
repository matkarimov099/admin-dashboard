import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Trash2Icon, TrashIcon, TruckIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DatePicker } from '@/components/custom/date-picker.tsx';
import { RadioOptions } from '@/components/custom/radio-options';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { customsPosts } from '@/data/posts';
import { cn } from '@/utils/utils.ts';
import {
  type AutoTransportDeclarationSchema,
  autoTransportDeclarationSchema,
} from '../schema/declaration.schema';
import {
  AdditionalSheetInfo,
  CustomsPostCodeInfo,
  DeclarationStatusInfo,
  DeclarationTypeInfo,
  ExporterSectionInfo,
  FieldNotFilledInfo,
  TotalItemNamesInfo,
  VersionInfo,
} from './info-labels';

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

  const [infoDate, setInfoDate] = useState<Date | undefined>(new Date());

  function onSubmit(values: AutoTransportDeclarationSchema) {
    console.log('Form submitted:', values);
    toast.success('Declaration saved successfully');
  }

  return (
    <div className="container mx-auto p-1 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TruckIcon className="size-6 text-primary" />
          <h1 className="font-bold text-md">Грузовая Таможенная Декларация</h1>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Section 1: Note, Radio Options, and Status */}
          <Card className="p-4 sm:p-6">
            <CardContent className="flex flex-col gap-4 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                {/* Примечание */}
                <div className="sm:col-span-1">
                  <FormField
                    control={form.control}
                    name="header.declarationNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel infoLabel="Дополнительное примечание к декларации">
                          Примечание
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Введите примечание" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Статус декларация */}
                <div className="sm:col-span-1">
                  <FormField
                    control={form.control}
                    name="header.typeCode"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel infoLabel={<DeclarationStatusInfo />}>Статус декларация</FormLabel>
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
                </div>

                {/* Версия */}
                <div className="sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="header.version"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel infoLabel={<VersionInfo />}>Версия</FormLabel>
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
                            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="header.declarationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel infoLabel="Уникальный номер таможенной декларации, присваиваемый при регистрации">
                        Грузовая Таможенная Декларация №
                      </FormLabel>
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
                      <FormLabel infoLabel={<DeclarationTypeInfo />}>1. Тип декларации</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Выберите тип декларации" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="EKS">Экспорт</SelectItem>
                          <SelectItem value="RE">Реэкспорт</SelectItem>
                          <SelectItem value="IM">Выпуск для свободного обращения</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Section 2: Exporter/Shipper */}
            <Card className="p-4 sm:p-6">
              <CardTitle infoTitle={<ExporterSectionInfo />}>
                2. Экспортёр/Грузоотправитель
              </CardTitle>
              <CardContent className="flex flex-col gap-4 p-4">
                <FormField
                  control={form.control}
                  name="exporter.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel infoLabel="Полное юридическое название компании экспортера">
                        Номи
                      </FormLabel>
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
                      <FormLabel infoLabel="Фактический адрес компании экспортера">Адрес</FormLabel>
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
                      <FormLabel infoLabel="Страна отправления товаров (код по классификатору стран)">
                        Мамлакат
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
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
                      <FormLabel infoLabel="Дополнительная информация об экспортере (ИНН, ОКПО и другие реквизиты). Дополнительная информация об экспортере (ИНН, ОКПО и другие реквизиты)">
                        Қўшимча маълумот
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Введите дополнительную информацию" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Section 3: Additional sheets and special information */}
            <Card className="p-4 sm:p-6">
              <CardContent className="flex flex-col gap-4 p-4">
                <FormField
                  control={form.control}
                  name="header.additionalSheet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel infoLabel={<AdditionalSheetInfo />}>3. Qo'shimcha varaq</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="1/1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="header.specialDispatch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel infoLabel={<FieldNotFilledInfo />}>4. Ed.Spec</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Не заполняется" disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="header.totalItemsNamed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel infoLabel={<TotalItemNamesInfo />}>5. Tovar umumiy nomi</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Общее число наименований" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="header.totalPlaces"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel infoLabel={<FieldNotFilledInfo />}>6. Joylar soni</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Не заполняется" disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          {/*Section 4: Information number */}
          <Card className="p-4 sm:p-6">
            <CardTitle infoTitle={<CustomsPostCodeInfo />}>7. Ma'lumot raqami</CardTitle>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Customs Post-Select */}
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="header.customsPost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Божхона постини танланг</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Пост танланг" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {customsPosts.map(post => (
                              <SelectItem key={post.code} value={post.code}>
                                {post.code} - {post.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Date Picker */}
                <div className="col-span-1">
                  <DatePicker
                    value={infoDate}
                    onChange={setInfoDate}
                    placeholder="ДД.ММ.ГГГГ"
                    label="Сана"
                  />
                </div>
                {/* Input Field */}
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="header.referenceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Регистрация номери</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Номерни киритинг" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Action buttons */}
                <div className="col-span-1 flex items-end">
                  <div className="flex w-full gap-2 sm:w-auto">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-center sm:text-sm"
                          leftIcon={<Send className="h-4 w-4 shrink-0 text-(--color-primary)" />}
                        >
                          <span className="ml-2 hidden sm:inline">BYuD ni yuborish</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bojxona qiymatlari reestriga BYuD ni yuborish</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-center sm:text-sm"
                          leftIcon={<Trash2Icon className="h-4 w-4 shrink-0 text-(--system-red)" />}
                        >
                          <span className="ml-2 hidden sm:inline">Olib tashlash</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bojxona deklaratsiyasini bojxona qiymatlari registridan olib tashlash</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </CardContent>
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
