import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/common/modal';
import { DataTable } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import type { ExporterSchema } from '@/features/cargo-custom-declaration/schema/exporter.schema';
import { AddExporterModal } from './AddExporterModal';
import { ExporterCatalogToolbar } from './ExporterCatalogToolbar';
import { getExporterColumns } from './exporter-table-columns';
import type { Exporter } from '@/features/cargo-custom-declaration/types';

export interface ExporterCatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exporters?: Exporter[];
  onExportersChange?: (exporters: Exporter[]) => void;
  onSelectExporter?: (exporter: Exporter) => void;
}

export function ExporterCatalogModal({
  open,
  onOpenChange,
  exporters = [],
  onExportersChange,
  onSelectExporter,
}: ExporterCatalogModalProps) {
  // State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [data, setData] = useState<Exporter[]>(exporters);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [selectedExporter, setSelectedExporter] = useState<Exporter | null>(null);

  // Sync data with exporters prop
  useEffect(() => {
    setData(exporters);
  }, [exporters]);

  // Filter exporters based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return data;
    }
    const query = searchQuery.toLowerCase();
    return data.filter(
      exporter =>
        exporter.nameAndAddress.toLowerCase().includes(query) ||
        exporter.country.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  // Handle add new exporter
  const handleAddNew = useCallback(() => {
    setSelectedExporter(null);
  }, []);

  // Handle edit exporter
  const handleEdit = useCallback((exporter: Exporter) => {
    setSelectedExporter(exporter);
  }, []);

  // Handle save exporter (create or update)
  const handleSave = useCallback(
    (formData: ExporterSchema) => {
      setIsPending(true);

      // Simulate API call
      setTimeout(() => {
        if (selectedExporter) {
          // Update existing exporter
          const updatedData = data.map(exp =>
            exp.id === selectedExporter.id
              ? { ...exp, nameAndAddress: formData.nameAndAddress, country: formData.country }
              : exp
          );
          setData(updatedData);
          if (onExportersChange) {
            onExportersChange(updatedData);
          }
          toast.success('Eksportchi muvaffaqiyatli yangilandi');
        } else {
          // Create new exporter
          const newExporter: Exporter = {
            id: `exp-${Date.now()}`,
            nameAndAddress: formData.nameAndAddress,
            country: formData.country,
          };
          const updatedData = [...data, newExporter];
          setData(updatedData);
          if (onExportersChange) {
            onExportersChange(updatedData);
          }
          toast.success('Yangi eksportchi muvaffaqiyatli qo\'shildi');
        }

        setIsPending(false);
        setSelectedExporter(null);
      }, 500);
    },
    [selectedExporter, data, onExportersChange]
  );

  // Handle delete exporter
  const handleDelete = useCallback(() => {
    toast.error('Iltimos, o\'chirish uchun qatorlarni tanlang');
  }, []);

  // Handle edit - open the add modal
  const handleEditExporter = useCallback(
    (exporter: Exporter) => {
      handleEdit(exporter);
      setIsAddModalOpen(true);
    },
    [handleEdit]
  );

  // Handle add new - open the add modal
  const handleAddNewExporter = useCallback(() => {
    handleAddNew();
    setIsAddModalOpen(true);
  }, [handleAddNew]);

  // Handle close modal
  const handleCloseModal = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  // Table columns definition - as a function for DataTable
  const getColumns = useCallback(
    (handleRowDeselection: ((rowId: string) => void) | null | undefined) => {
      return getExporterColumns({
        onEdit: handleEditExporter,
        onSelectExporter,
        onCloseModal: handleCloseModal,
        enableRowSelection: true,
        handleRowDeselection,
      });
    },
    [handleEditExporter, onSelectExporter, handleCloseModal]
  );

  // Custom toolbar content - render function that receives toolbar props
  const renderToolbarContent = useCallback(
    () => <ExporterCatalogToolbar onAddNew={handleAddNewExporter} onDelete={handleDelete} />,
    [handleAddNewExporter, handleDelete]
  );

  // Handle completed button
  const handleCompleted = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  // Handle save from AddExporterModal
  const handleSaveExporter = useCallback(
    (data: ExporterSchema) => {
      handleSave(data);
      setIsAddModalOpen(false);
    },
    [handleSave]
  );

  return (
    <>
      <Modal open={open} onOpenChange={onOpenChange}>
        <ModalContent className="sm:max-w-6xl">
          <ModalHeader>
            <ModalTitle>Eksportchilar katalogi</ModalTitle>
          </ModalHeader>

          <ModalBody className="flex flex-col overflow-hidden">
            <DataTable<Exporter>
              getColumns={getColumns}
              data={filteredData}
              totalItems={filteredData.length}
              idField="id"
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              renderToolbarContent={renderToolbarContent}
              pageSize={25}
              config={{
                enableRowSelection: true,
                enableClickRowSelect: true,
                enableSearch: true,
                enableToolbar: true,
                enablePagination: true,
                enableColumnResizing: false,
                enableColumnVisibility: true,
                enableExport: false,
                tableSettings: false,
                manualPagination: false,
                manualSorting: false,
                manualFiltering: false,
                manualSearching: true,
              }}
            />
          </ModalBody>

          <ModalFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Bekor qilish
            </Button>
            <Button type="button" variant="success" onClick={handleCompleted}>
              Bajarildi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add/Edit Exporter Modal */}
      <AddExporterModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        exporter={selectedExporter}
        onSave={handleSaveExporter}
        isPending={isPending}
      />
    </>
  );
}

ExporterCatalogModal.displayName = 'ExporterCatalogModal';

export default ExporterCatalogModal;
