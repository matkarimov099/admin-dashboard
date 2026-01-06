import { zodResolver } from '@hookform/resolvers/zod';

import { CirclePlusIcon, Send, Trash2Icon, TruckIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { DatePicker } from '@/components/custom/date-picker.tsx';
import { RadioOptions } from '@/components/custom/radio-options';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { customsPosts } from '@/data/posts';
import { useTranslations } from '@/hooks/use-translations';
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
  const { t } = useTranslations();
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
        <div className="flex items-center gap-2">
          <TruckIcon className="size-6 text-(--color-primary)" />
          <h1 className="font-bold text-md uppercase">
            {t('declarationForm.title')}: <span className="font-normal">EK20260000879</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-8 grid-rows-8 gap-1">
        <Card className="col-span-4 row-span-3">
          <CardTitle
            infoTitle={<ExporterSectionInfo />}
            rightSection={
              <Button size="icon" variant="ghost">
                <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
              </Button>
            }
          >
            2.Отправитель/экспортер
          </CardTitle>
        </Card>
        <Card className="col-span-2 col-start-5">
          <CardTitle infoTitle={<DeclarationTypeInfo />}>1.Тип декларации</CardTitle>
        </Card>
        <Card className="col-span-2 col-start-7 row-span-2">
          <CardTitle infoTitle="“A” grafa (faqatgina qogʻoz shakldagi BYDning qushimcha varaqlarida).">
            A
          </CardTitle>
        </Card>
        <Card className="col-span-2 col-start-7 row-start-3">
          <CardTitle infoTitle={<CustomsPostCodeInfo />}>7.Справочный номер</CardTitle>
        </Card>
        <Card className="col-span-4 col-start-1 row-span-2 row-start-4">6</Card>
        <Card className="col-span-4 col-start-5 row-span-2 row-start-4">8</Card>
        <Card className="col-start-5 row-start-2">
          <CardTitle>3.Доб. лист</CardTitle>
        </Card>
        <Card className="col-start-6 row-start-2">
          <CardTitle>Отгр. спец.</CardTitle>
        </Card>
        <Card className="col-start-5 row-start-3">11</Card>
        <Card className="col-start-6 row-start-3">12</Card>
        <Card className="col-span-4 row-span-2 row-start-6">13</Card>
        <Card className="col-span-2 col-start-5 row-start-6">14</Card>
        <Card className="col-span-2 col-start-7 row-start-6">15</Card>
        <Card className="col-span-2 col-start-5 row-start-7">16</Card>
        <Card className="col-span-2 col-start-7 row-start-7">17</Card>
        <Card className="col-span-4 row-start-8">18</Card>
        <Card className="col-span-4 col-start-5 row-start-8">19</Card>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 space-y-4">
          {/* Section 1: Note, Radio Options, and Status */}
          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                {/* Примечание */}
                <div className="sm:col-span-1">
                  <FormField
                    control={form.control}
                    name="header.declarationNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel infoLabel={t('declarationForm.infoLabel.noteInfo')}>
                          {t('declarationForm.note')}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t('declarationForm.notePlaceholder')} />
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
                        <FormLabel infoLabel={<DeclarationStatusInfo />}>
                          {t('declarationForm.status')}
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={t('declarationForm.statusPlaceholder')} />
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
                        <FormLabel infoLabel={<VersionInfo />}>
                          {t('declarationForm.version')}
                        </FormLabel>
                        <FormControl>
                          <RadioOptions
                            options={[
                              { value: 'working', label: t('declarationForm.versionWorking') },
                              { value: 'formatted', label: t('declarationForm.versionFormatted') },
                              { value: 'cancelled', label: t('declarationForm.versionCancelled') },
                              { value: 'draft', label: t('declarationForm.versionDraft') },
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
                      <FormLabel infoLabel={t('declarationForm.declarationNumberInfo')}>
                        {t('declarationForm.declarationNumber')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('declarationForm.declarationNumberPlaceholder')}
                        />
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
                      <FormLabel infoLabel={<DeclarationTypeInfo />}>
                        {t('declarationForm.declarationType')}
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={t('declarationForm.declarationTypePlaceholder')}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="EKS">
                            {t('declarationForm.declarationTypeExport')}
                          </SelectItem>
                          <SelectItem value="RE">
                            {t('declarationForm.declarationTypeReexport')}
                          </SelectItem>
                          <SelectItem value="IM">
                            {t('declarationForm.declarationTypeImport')}
                          </SelectItem>
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
                {t('declarationForm.exporterSectionTitle')}
              </CardTitle>
              <CardContent className="flex flex-col gap-4 p-4">
                <FormField
                  control={form.control}
                  name="exporter.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel infoLabel={t('declarationForm.infoLabel.exporterNameInfo')}>
                        {t('declarationForm.exporterName')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('declarationForm.exporterNamePlaceholder')}
                        />
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
                      <FormLabel infoLabel={t('declarationForm.infoLabel.exporterAddressInfo')}>
                        {t('declarationForm.exporterAddress')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('declarationForm.exporterAddressPlaceholder')}
                        />
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
                      <FormLabel infoLabel={t('declarationForm.infoLabel.exporterCountryInfo')}>
                        {t('declarationForm.exporterCountry')}
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={t('declarationForm.exporterCountryPlaceholder')}
                            />
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
                      <FormLabel
                        infoLabel={t('declarationForm.infoLabel.exporterAdditionalInfoInfo')}
                      >
                        {t('declarationForm.exporterAdditionalInfo')}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t('declarationForm.exporterAdditionalInfoPlaceholder')}
                        />
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
                      <FormLabel infoLabel={<AdditionalSheetInfo />}>
                        {t('declarationForm.additionalSheet')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder={t('declarationForm.additionalSheetPlaceholder')}
                        />
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
                      <FormLabel infoLabel={<FieldNotFilledInfo />}>
                        {t('declarationForm.specialDispatch')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('declarationForm.specialDispatchPlaceholder')}
                          disabled
                        />
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
                      <FormLabel infoLabel={<TotalItemNamesInfo />}>
                        {t('declarationForm.totalItems')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder={t('declarationForm.totalItemsPlaceholder')}
                        />
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
                      <FormLabel infoLabel={<FieldNotFilledInfo />}>
                        {t('declarationForm.totalPlaces')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t('declarationForm.totalPlacesPlaceholder')}
                          disabled
                        />
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
            <CardTitle infoTitle={<CustomsPostCodeInfo />}>
              {t('declarationForm.infoNumberTitle')}
            </CardTitle>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Customs Post-Select */}
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="header.customsPost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('declarationForm.customsPost')}</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder={t('declarationForm.customsPostPlaceholder')}
                              />
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
                    placeholder={t('declarationForm.datePlaceholder')}
                    label={t('declarationForm.date')}
                  />
                </div>
                {/* Input Field */}
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="header.referenceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('declarationForm.registrationNumber')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t('declarationForm.registrationNumberPlaceholder')}
                          />
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
                          <span className="ml-2 hidden sm:inline">
                            {t('declarationForm.sendButtonShort')}
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('declarationForm.infoLabel.sendToRegisterInfo')}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-center sm:text-sm"
                          leftIcon={<Trash2Icon className="h-4 w-4 shrink-0 text-(--system-red)" />}
                        >
                          <span className="ml-2 hidden sm:inline">
                            {t('declarationForm.deleteButtonShort')}
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('declarationForm.infoLabel.deleteFromRegisterInfo')}</p>
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
              {t('declarationForm.cancel')}
            </Button>
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              {t('declarationForm.save')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
