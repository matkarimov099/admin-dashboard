import { CirclePlusIcon } from 'lucide-react';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import DistrictSelect from '@/components/form-inputs/district-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Column8Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { ImporterCatalogModal } from '@/features/cargo-custom-declaration/components/modals/importer-catalog';
import { TIFCatalogModal } from '@/features/cargo-custom-declaration/components/modals/tif-catalog';
import type { CargoCustomDeclarationSchema } from '@/features/cargo-custom-declaration/schema/declaration.schema.ts';
import type {
  Importer,
  TIFIndividual,
  TIFLegalEntity,
} from '@/features/cargo-custom-declaration/types';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useTranslations } from '@/hooks/use-translations';

interface Column8Props {
  form: UseFormReturn<CargoCustomDeclarationSchema>;
  onSubmit: (data: any) => void;
}

export function Column8({ form, onSubmit }: Column8Props) {
  const { t } = useTranslations();

  const {
    isOpen: tifCatalogOpen,
    onOpen: openTIFCatalog,
    onOpenChange: setTIFCatalogOpen,
  } = useDisclosure();

  const {
    isOpen: importerCatalogOpen,
    onOpen: openImporterCatalog,
    onOpenChange: setImporterCatalogOpen,
  } = useDisclosure();

  // Sample TIF data - Legal Entities
  const [legalEntities, setLegalEntities] = useState<TIFLegalEntity[]>([
    {
      id: 'legal-entity-1',
      stir: '207243390',
      ktut: '',
      district: 'Xorazm',
      districtCode: '',
      name: 'Xorazm',
      address: 'Xorazm viloyati, Urgench shahri',
      phone: '+998 62 224 00 00',
    },
  ]);

  // Sample TIF data - Individuals
  const [individuals, setIndividuals] = useState<TIFIndividual[]>([
    {
      id: 'individual-1',
      pinfl: '31212987130019',
      district: 'Urganch tuman',
      districtCode: '1735204',
      fullName: 'Matkarimov Shoxzodbek',
      address: 'Toshkent sh. Olmazor',
      phone: '+998 90 123 45 67',
      passportNumber: 'AB1234567',
      issueDate: '2020-01-15',
      issuedBy: 'IIB',
    },
    {
      id: 'individual-2',
      pinfl: '31212987130019',
      district: 'Urganch tuman',
      districtCode: '1735204',
      fullName: 'Abdullayev Anvar',
      address: 'Toshkent sh. Olmazor',
      phone: '+998 90 987 65 43',
      passportNumber: 'CD7654321',
      issueDate: '2021-05-20',
      issuedBy: 'IIB',
    },
  ]);

  // Sample Importer data
  const [importers, setImporters] = useState<Importer[]>([
    {
      id: 'imp-1',
      ktut: '',
      stir: '207243390',
      nameAndAddress: 'Xorazm',
    },
  ]);

  const handleSelectLegalEntity = (item: TIFLegalEntity) => {
    form.setValue('importer.name', item.name);
    form.setValue('importer.address', item.address);
    form.setValue('importer.phone', item.phone);
    form.setValue('importer.inn', item.stir);
  };

  const handleSelectIndividual = (item: TIFIndividual) => {
    form.setValue('importer.name', item.fullName);
    form.setValue('importer.address', item.address);
    form.setValue('importer.phone', item.phone);
    form.setValue('importer.pinfl', item.pinfl);
  };

  const handleSelectImporter = (importer: Importer) => {
    // Set importer name in a separate field or append to existing
    const currentName = form.getValues('importer.name') || '';
    if (currentName) {
      form.setValue('importer.name', `${currentName}\n${importer.nameAndAddress} topshirig'i bilan`);
    } else {
      form.setValue('importer.name', importer.nameAndAddress);
    }
    if (importer.stir) {
      form.setValue('importer.inn', importer.stir);
    }
  };

  // KTUT input state (local state since it may not be in schema)
  const [ktut, setKtut] = useState('');

  return (
    <Card className="col-span-4 row-span-2 row-start-4">
      <CardTitle
        infoTitle={<Column8Info />}
        rightSection={
          <Input
            inputSize="sm"
            placeholder="KTUT"
            className="w-24"
            value={ktut}
            onChange={e => setKtut(e.target.value)}
          />
        }
      >
        {t('declarationForm.infoLabel.column8.name')}
      </CardTitle>
      <CardContent className="px-0 py-2">
        <Form {...form}>
          <form
            onSubmit={e => {
              form.handleSubmit(onSubmit)(e);
            }}
            className="space-y-3"
          >
            {/* 1. Yuk qabul qiluvchi nomi */}
            <FormField
              control={form.control}
              name="importer.name"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <FormControl>
                      <Input
                        inputSize="md"
                        placeholder="Yuk qabul qiluvchi nomini ko'rsating"
                        infoText="Yuk qabul qiluvchining to'liq nomi"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <Button
                    type="button"
                    hoverText="Yuklarni qabul qilish bo'yicha qo'llanma"
                    className="shrink-0"
                    size="icon"
                    variant="ghost"
                    onClick={openTIFCatalog}
                  >
                    <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 2. Manzil */}
            <FormField
              control={form.control}
              name="importer.address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      inputSize="md"
                      placeholder="Manzilni ko'rsating"
                      infoText="Yuk qabul qiluvchining manzili"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 3. Telefon raqam */}
            <FormField
              control={form.control}
              name="importer.phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      inputSize="md"
                      placeholder="Telefon raqam"
                      infoText="Telefon raqami"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 4. Qo'shimcha ma'lumot - using a custom field since it may not exist in schema */}
            <FormField
              control={form.control}
              name="importer.address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      inputSize="md"
                      placeholder="Qo'shimcha ma'lumot"
                      infoText="Qo'shimcha ma'lumot"
                      value=""
                      onChange={() => {}}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 5. Importator nomi (agar importer va qabul qiluvchi turli shaxslar bo'lsa) */}
            <FormField
              control={form.control}
              name="importer.name"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <FormControl>
                      <Input
                        inputSize="md"
                        placeholder="Importator nomini ko'rsating (agar importer va qabul qiluvchi turli shaxslar bo'lsa)"
                        infoText="Importerning nomi"
                        value=""
                        onChange={() => {}}
                      />
                    </FormControl>
                  </div>
                  <Button
                    type="button"
                    hoverText="Importer katalogi"
                    className="shrink-0"
                    size="icon"
                    variant="ghost"
                    onClick={openImporterCatalog}
                  >
                    <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 6. STIR/PINFL */}
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="importer.inn"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        inputSize="md"
                        placeholder="STIR/PINFL"
                        infoText="Soliq to'lovchi identifikatsiya raqami"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-gray-500">/</span>
              <FormField
                control={form.control}
                name="importer.pinfl"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <DistrictSelect
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Tumanni tanlang..."
                        allowClear
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>

      {/* TIF Catalog Modal */}
      <TIFCatalogModal
        open={tifCatalogOpen}
        onOpenChange={setTIFCatalogOpen}
        legalEntities={legalEntities}
        individuals={individuals}
        onLegalEntitiesChange={setLegalEntities}
        onIndividualsChange={setIndividuals}
        onSelectLegalEntity={handleSelectLegalEntity}
        onSelectIndividual={handleSelectIndividual}
      />

      {/* Importer Catalog Modal */}
      <ImporterCatalogModal
        open={importerCatalogOpen}
        onOpenChange={setImporterCatalogOpen}
        importers={importers}
        onImportersChange={setImporters}
        onSelectImporter={handleSelectImporter}
      />
    </Card>
  );
}
