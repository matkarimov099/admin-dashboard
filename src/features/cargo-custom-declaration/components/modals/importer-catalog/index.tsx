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
import type { ImporterSchema } from '@/features/cargo-custom-declaration/schema/importer.schema';
import type { Importer } from '@/features/cargo-custom-declaration/types';
import { AddImporterModal } from './AddImporterModal';
import { ImporterCatalogToolbar } from './ImporterCatalogToolbar';
import { getImporterColumns } from './importer-table-columns';

export interface ImporterCatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  importers?: Importer[];
  onImportersChange?: (importers: Importer[]) => void;
  onSelectImporter?: (importer: Importer) => void;
}

export function ImporterCatalogModal({
  open,
  onOpenChange,
  importers = [],
  onImportersChange,
  onSelectImporter,
}: ImporterCatalogModalProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [data, setData] = useState<Importer[]>(importers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [selectedImporter, setSelectedImporter] = useState<Importer | null>(null);

  useEffect(() => {
    setData(importers);
  }, [importers]);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return data;
    }
    const query = searchQuery.toLowerCase();
    return data.filter(
      importer =>
        importer.nameAndAddress.toLowerCase().includes(query) ||
        (importer.stir && importer.stir.toLowerCase().includes(query)) ||
        (importer.ktut && importer.ktut.toLowerCase().includes(query))
    );
  }, [data, searchQuery]);

  const handleAddNew = useCallback(() => {
    setSelectedImporter(null);
  }, []);

  const handleEdit = useCallback((importer: Importer) => {
    setSelectedImporter(importer);
  }, []);

  const handleSave = useCallback(
    (formData: ImporterSchema) => {
      setIsPending(true);
      setTimeout(() => {
        if (selectedImporter) {
          const updatedData = data.map(imp =>
            imp.id === selectedImporter.id
              ? {
                  ...imp,
                  ktut: formData.ktut || '',
                  stir: formData.stir || '',
                  nameAndAddress: formData.nameAndAddress,
                }
              : imp
          );
          setData(updatedData);
          if (onImportersChange) {
            onImportersChange(updatedData);
          }
          toast.success('Importer updated successfully');
        } else {
          const newImporter: Importer = {
            id: `imp-${Date.now()}`,
            ktut: formData.ktut || '',
            stir: formData.stir || '',
            nameAndAddress: formData.nameAndAddress,
          };
          const updatedData = [...data, newImporter];
          setData(updatedData);
          if (onImportersChange) {
            onImportersChange(updatedData);
          }
          toast.success('New importer added successfully');
        }

        setIsPending(false);
        setSelectedImporter(null);
      }, 500);
    },
    [selectedImporter, data, onImportersChange]
  );

  const handleDelete = useCallback(() => {
    toast.error('Please select rows to delete');
  }, []);

  const handleEditImporter = useCallback(
    (importer: Importer) => {
      handleEdit(importer);
      setIsAddModalOpen(true);
    },
    [handleEdit]
  );

  const handleAddNewImporter = useCallback(() => {
    handleAddNew();
    setIsAddModalOpen(true);
  }, [handleAddNew]);

  const handleCloseModal = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const getColumns = useCallback(
    (handleRowDeselection: ((rowId: string) => void) | null | undefined) => {
      return getImporterColumns({
        onEdit: handleEditImporter,
        onSelectItem: onSelectImporter,
        onCloseModal: handleCloseModal,
        enableRowSelection: true,
        handleRowDeselection,
      });
    },
    [handleEditImporter, onSelectImporter, handleCloseModal]
  );

  const renderToolbarContent = useCallback(
    () => <ImporterCatalogToolbar onAddNew={handleAddNewImporter} onDelete={handleDelete} />,
    [handleAddNewImporter, handleDelete]
  );

  const handleCompleted = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleSaveImporter = useCallback(
    (data: ImporterSchema) => {
      handleSave(data);
      setIsAddModalOpen(false);
    },
    [handleSave]
  );

  return (
    <>
      <Modal open={open} onOpenChange={onOpenChange}>
        <ModalContent className="sm:max-w-4xl">
          <ModalHeader>
            <ModalTitle>Importer Catalog</ModalTitle>
          </ModalHeader>

          <ModalBody className="flex flex-col overflow-hidden">
            <DataTable<Importer>
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
              Cancel
            </Button>
            <Button type="button" variant="success" onClick={handleCompleted}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add/Edit Importer Modal */}
      <AddImporterModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        item={selectedImporter}
        onSave={handleSaveImporter}
        isPending={isPending}
      />
    </>
  );
}

ImporterCatalogModal.displayName = 'ImporterCatalogModal';

export default ImporterCatalogModal;
