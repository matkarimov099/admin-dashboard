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
import type { SenderSchema } from '@/features/cargo-custom-declaration/schema/sender.schema';
import type { Sender } from '@/features/cargo-custom-declaration/types';
import { AddSenderModal } from './AddSenderModal';
import { SenderCatalogToolbar } from './SenderCatalogToolbar';
import { getSenderColumns } from './sender-table-columns';

export interface SenderCatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  senders?: Sender[];
  onSendersChange?: (senders: Sender[]) => void;
  onSelectSender?: (sender: Sender) => void;
}

export function SenderCatalogModal({
  open,
  onOpenChange,
  senders = [],
  onSendersChange,
  onSelectSender,
}: SenderCatalogModalProps) {
  // State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [data, setData] = useState<Sender[]>(senders);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [selectedSender, setSelectedSender] = useState<Sender | null>(null);

  // Sync data with senders prop
  useEffect(() => {
    setData(senders);
  }, [senders]);

  // Filter senders based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return data;
    }
    const query = searchQuery.toLowerCase();
    return data.filter(
      sender =>
        sender.name.toLowerCase().includes(query) ||
        sender.address.toLowerCase().includes(query) ||
        (sender.country && sender.country.toLowerCase().includes(query))
    );
  }, [data, searchQuery]);

  // Handle add new sender
  const handleAddNew = useCallback(() => {
    setSelectedSender(null);
  }, []);

  // Handle edit sender
  const handleEdit = useCallback((sender: Sender) => {
    setSelectedSender(sender);
  }, []);

  // Handle save sender (create or update)
  const handleSave = useCallback(
    (formData: SenderSchema) => {
      setIsPending(true);

      // Simulate API call
      setTimeout(() => {
        if (selectedSender) {
          // Update existing sender
          const updatedData = data.map(snd =>
            snd.id === selectedSender.id
              ? {
                  ...snd,
                  name: formData.name,
                  address: formData.address,
                  country: formData.country || '',
                  additionalInfo: formData.additionalInfo,
                }
              : snd
          );
          setData(updatedData);
          if (onSendersChange) {
            onSendersChange(updatedData);
          }
          toast.success("Jo'natuvchi muvaffaqiyatli yangilandi");
        } else {
          // Create new sender
          const newSender: Sender = {
            id: `snd-${Date.now()}`,
            name: formData.name,
            address: formData.address,
            country: formData.country || '',
            additionalInfo: formData.additionalInfo,
          };
          const updatedData = [...data, newSender];
          setData(updatedData);
          if (onSendersChange) {
            onSendersChange(updatedData);
          }
          toast.success("Yangi jo'natuvchi muvaffaqiyatli qo'shildi");
        }

        setIsPending(false);
        setSelectedSender(null);
      }, 500);
    },
    [selectedSender, data, onSendersChange]
  );

  // Handle delete sender
  const handleDelete = useCallback(() => {
    toast.error("Iltimos, o'chirish uchun qatorlarni tanlang");
  }, []);

  // Handle edit - open the add modal
  const handleEditSender = useCallback(
    (sender: Sender) => {
      handleEdit(sender);
      setIsAddModalOpen(true);
    },
    [handleEdit]
  );

  // Handle add new - open the add modal
  const handleAddNewSender = useCallback(() => {
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
      return getSenderColumns({
        onEdit: handleEditSender,
        onSelectSender,
        onCloseModal: handleCloseModal,
        enableRowSelection: true,
        handleRowDeselection,
      });
    },
    [handleEditSender, onSelectSender, handleCloseModal]
  );

  // Custom toolbar content - render function that receives toolbar props
  const renderToolbarContent = useCallback(
    () => <SenderCatalogToolbar onAddNew={handleAddNewSender} onDelete={handleDelete} />,
    [handleAddNewSender, handleDelete]
  );

  // Handle completed button
  const handleCompleted = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  // Handle save from AddSenderModal
  const handleSaveSender = useCallback(
    (data: SenderSchema) => {
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
            <ModalTitle>Yuklarni jo'natuvchi qo'llanma</ModalTitle>
          </ModalHeader>

          <ModalBody className="flex flex-col overflow-hidden">
            <DataTable<Sender>
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

      {/* Add/Edit Sender Modal */}
      <AddSenderModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        sender={selectedSender}
        onSave={handleSaveSender}
        isPending={isPending}
      />
    </>
  );
}

SenderCatalogModal.displayName = 'SenderCatalogModal';

export default SenderCatalogModal;
