import { CirclePlusIcon } from 'lucide-react';
import { useState } from 'react';
import { DatePicker } from '@/components/form-inputs/date-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Column7Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { CustomsPostCatalogModal } from '@/features/cargo-custom-declaration/components/modals/customs-post-catalog';
import type { CustomsPost } from '@/data/posts';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useTranslations } from '@/hooks/use-translations';

export function Column7() {
  const { t } = useTranslations();
  const {
    isOpen: customsPostCatalogOpen,
    onOpen: openCustomsPostCatalog,
    onOpenChange: setCustomsPostCatalogOpen,
  } = useDisclosure();

  const [customsPostCode, setCustomsPostCode] = useState('');
  const [referenceDate, setReferenceDate] = useState<Date | undefined>(undefined);

  const handleSelectPost = (post: CustomsPost) => {
    setCustomsPostCode(post.code);
  };

  return (
    <Card className="col-span-2 col-start-7 row-start-3 gap-y-3">
      <CardTitle className="py-0!" infoTitle={<Column7Info />}>
        {t('declarationForm.infoLabel.column7.name')}
      </CardTitle>
      <CardContent className="flex flex-row items-end gap-2 p-0">
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <Input
            inputSize="md"
            placeholder="11007"
            infoText="Bojxona posti kodi"
            value={customsPostCode}
            onChange={e => setCustomsPostCode(e.target.value)}
          />
          <Button
            type="button"
            hoverText="Bojxona postlari"
            className="shrink-0"
            size="icon"
            variant="ghost"
            onClick={openCustomsPostCatalog}
          >
            <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
          </Button>
        </div>
        <div className="w-36">
          <DatePicker
            label=""
            placeholder="DD.MM.YYYY"
            value={referenceDate}
            onChange={setReferenceDate}
          />
        </div>
      </CardContent>

      {/* Customs Post Catalog Modal */}
      <CustomsPostCatalogModal
        open={customsPostCatalogOpen}
        onOpenChange={setCustomsPostCatalogOpen}
        onSelectPost={handleSelectPost}
      />
    </Card>
  );
}
