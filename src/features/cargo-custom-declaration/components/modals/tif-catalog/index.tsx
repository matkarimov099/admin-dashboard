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
import type { TIFLegalEntitySchema } from '@/features/cargo-custom-declaration/schema/tif-legal-entity.schema';
import type { TIFIndividualSchema } from '@/features/cargo-custom-declaration/schema/tif-individual.schema';
import type { TIFLegalEntity, TIFIndividual } from '@/features/cargo-custom-declaration/types';
import { AddLegalEntityModal } from './AddLegalEntityModal';
import { AddIndividualModal } from './AddIndividualModal';
import { TIFCatalogToolbar } from './TIFCatalogToolbar';
import { getLegalEntityColumns } from './legal-entity-table-columns';
import { getIndividualColumns } from './individual-table-columns';

type TabType = 'legalEntity' | 'individual';

export interface TIFCatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  legalEntities?: TIFLegalEntity[];
  individuals?: TIFIndividual[];
  onLegalEntitiesChange?: (items: TIFLegalEntity[]) => void;
  onIndividualsChange?: (items: TIFIndividual[]) => void;
  onSelectLegalEntity?: (item: TIFLegalEntity) => void;
  onSelectIndividual?: (item: TIFIndividual) => void;
}

export function TIFCatalogModal({
  open,
  onOpenChange,
  legalEntities = [],
  individuals = [],
  onLegalEntitiesChange,
  onIndividualsChange,
  onSelectLegalEntity,
  onSelectIndividual,
}: TIFCatalogModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('legalEntity');
  const [isAddLegalEntityModalOpen, setIsAddLegalEntityModalOpen] = useState(false);
  const [isAddIndividualModalOpen, setIsAddIndividualModalOpen] = useState(false);
  const [legalEntityData, setLegalEntityData] = useState<TIFLegalEntity[]>(legalEntities);
  const [individualData, setIndividualData] = useState<TIFIndividual[]>(individuals);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [selectedLegalEntity, setSelectedLegalEntity] = useState<TIFLegalEntity | null>(null);
  const [selectedIndividual, setSelectedIndividual] = useState<TIFIndividual | null>(null);

  useEffect(() => {
    setLegalEntityData(legalEntities);
  }, [legalEntities]);

  useEffect(() => {
    setIndividualData(individuals);
  }, [individuals]);

  const filteredLegalEntityData = useMemo(() => {
    if (!searchQuery.trim()) {
      return legalEntityData;
    }
    const query = searchQuery.toLowerCase();
    return legalEntityData.filter(
      item =>
        item.stir.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query) ||
        (item.ktut && item.ktut.toLowerCase().includes(query))
    );
  }, [legalEntityData, searchQuery]);

  const filteredIndividualData = useMemo(() => {
    if (!searchQuery.trim()) {
      return individualData;
    }
    const query = searchQuery.toLowerCase();
    return individualData.filter(
      item =>
        item.pinfl.toLowerCase().includes(query) ||
        item.fullName.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query)
    );
  }, [individualData, searchQuery]);

  const handleAddNewLegalEntity = useCallback(() => {
    setSelectedLegalEntity(null);
    setIsAddLegalEntityModalOpen(true);
  }, []);

  const handleAddNewIndividual = useCallback(() => {
    setSelectedIndividual(null);
    setIsAddIndividualModalOpen(true);
  }, []);

  const handleEditLegalEntity = useCallback((item: TIFLegalEntity) => {
    setSelectedLegalEntity(item);
    setIsAddLegalEntityModalOpen(true);
  }, []);

  const handleEditIndividual = useCallback((item: TIFIndividual) => {
    setSelectedIndividual(item);
    setIsAddIndividualModalOpen(true);
  }, []);

  const handleSaveLegalEntity = useCallback(
    (formData: TIFLegalEntitySchema) => {
      setIsPending(true);
      setTimeout(() => {
        if (selectedLegalEntity) {
          const updatedData = legalEntityData.map(item =>
            item.id === selectedLegalEntity.id
              ? {
                  ...item,
                  ...formData,
                }
              : item
          );
          setLegalEntityData(updatedData);
          if (onLegalEntitiesChange) {
            onLegalEntitiesChange(updatedData);
          }
          toast.success('Legal entity updated successfully');
        } else {
          const newItem: TIFLegalEntity = {
            id: `legal-entity-${Date.now()}`,
            ...formData,
          };
          const updatedData = [...legalEntityData, newItem];
          setLegalEntityData(updatedData);
          if (onLegalEntitiesChange) {
            onLegalEntitiesChange(updatedData);
          }
          toast.success('New legal entity added successfully');
        }
        setIsPending(false);
        setSelectedLegalEntity(null);
        setIsAddLegalEntityModalOpen(false);
      }, 500);
    },
    [selectedLegalEntity, legalEntityData, onLegalEntitiesChange]
  );

  const handleSaveIndividual = useCallback(
    (formData: TIFIndividualSchema) => {
      setIsPending(true);
      setTimeout(() => {
        if (selectedIndividual) {
          const updatedData = individualData.map(item =>
            item.id === selectedIndividual.id
              ? {
                  ...item,
                  ...formData,
                }
              : item
          );
          setIndividualData(updatedData);
          if (onIndividualsChange) {
            onIndividualsChange(updatedData);
          }
          toast.success('Individual updated successfully');
        } else {
          const newItem: TIFIndividual = {
            id: `individual-${Date.now()}`,
            ...formData,
          };
          const updatedData = [...individualData, newItem];
          setIndividualData(updatedData);
          if (onIndividualsChange) {
            onIndividualsChange(updatedData);
          }
          toast.success('New individual added successfully');
        }
        setIsPending(false);
        setSelectedIndividual(null);
        setIsAddIndividualModalOpen(false);
      }, 500);
    },
    [selectedIndividual, individualData, onIndividualsChange]
  );

  const handleDelete = useCallback(() => {
    toast.error('Please select rows to delete');
  }, []);

  const handleCloseModal = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleCompleted = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const getLegalEntityColumnsCallback = useCallback(
    (handleRowDeselection: ((rowId: string) => void) | null | undefined) => {
      return getLegalEntityColumns({
        onEdit: handleEditLegalEntity,
        onSelectItem: onSelectLegalEntity,
        onCloseModal: handleCloseModal,
        enableRowSelection: true,
        handleRowDeselection,
      });
    },
    [handleEditLegalEntity, onSelectLegalEntity, handleCloseModal]
  );

  const getIndividualColumnsCallback = useCallback(
    (handleRowDeselection: ((rowId: string) => void) | null | undefined) => {
      return getIndividualColumns({
        onEdit: handleEditIndividual,
        onSelectItem: onSelectIndividual,
        onCloseModal: handleCloseModal,
        enableRowSelection: true,
        handleRowDeselection,
      });
    },
    [handleEditIndividual, onSelectIndividual, handleCloseModal]
  );

  const renderLegalEntityToolbarContent = useCallback(
    () => (
      <TIFCatalogToolbar
        onAddNew={handleAddNewLegalEntity}
        onDelete={handleDelete}
        addHoverText="Add new legal entity"
      />
    ),
    [handleAddNewLegalEntity, handleDelete]
  );

  const renderIndividualToolbarContent = useCallback(
    () => (
      <TIFCatalogToolbar
        onAddNew={handleAddNewIndividual}
        onDelete={handleDelete}
        addHoverText="Add new individual"
      />
    ),
    [handleAddNewIndividual, handleDelete]
  );

  return (
    <>
      <Modal open={open} onOpenChange={onOpenChange}>
        <ModalContent className="sm:max-w-6xl">
          <ModalHeader>
            <ModalTitle>TIF Members Catalog</ModalTitle>
          </ModalHeader>

          <ModalBody className="flex flex-col overflow-hidden">
            {/* Custom Tabs */}
            <div className="mb-4 flex border-b border-gray-200">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'legalEntity'
                    ? 'border-b-2 border-green-500 bg-green-50 text-green-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('legalEntity')}
              >
                Legal Entities
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'individual'
                    ? 'border-b-2 border-green-500 bg-green-50 text-green-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('individual')}
              >
                Individuals
              </button>
            </div>

            {/* Legal Entities Tab Content */}
            {activeTab === 'legalEntity' && (
              <DataTable<TIFLegalEntity>
                getColumns={getLegalEntityColumnsCallback}
                data={filteredLegalEntityData}
                totalItems={filteredLegalEntityData.length}
                idField="id"
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                renderToolbarContent={renderLegalEntityToolbarContent}
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
            )}

            {/* Individuals Tab Content */}
            {activeTab === 'individual' && (
              <DataTable<TIFIndividual>
                getColumns={getIndividualColumnsCallback}
                data={filteredIndividualData}
                totalItems={filteredIndividualData.length}
                idField="id"
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                renderToolbarContent={renderIndividualToolbarContent}
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
            )}
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

      {/* Add/Edit Legal Entity Modal */}
      <AddLegalEntityModal
        open={isAddLegalEntityModalOpen}
        onOpenChange={setIsAddLegalEntityModalOpen}
        item={selectedLegalEntity}
        onSave={handleSaveLegalEntity}
        isPending={isPending}
      />

      {/* Add/Edit Individual Modal */}
      <AddIndividualModal
        open={isAddIndividualModalOpen}
        onOpenChange={setIsAddIndividualModalOpen}
        item={selectedIndividual}
        onSave={handleSaveIndividual}
        isPending={isPending}
      />
    </>
  );
}

TIFCatalogModal.displayName = 'TIFCatalogModal';

export default TIFCatalogModal;
