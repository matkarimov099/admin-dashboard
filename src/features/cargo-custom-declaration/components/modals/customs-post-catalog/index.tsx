import { useCallback, useMemo, useState } from 'react';
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
import { type CustomsPost, customsPosts } from '@/data/posts';
import { getPostColumns } from './post-table-columns';

export interface CustomsPostCatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPost?: (post: CustomsPost) => void;
}

export function CustomsPostCatalogModal({
  open,
  onOpenChange,
  onSelectPost,
}: CustomsPostCatalogModalProps) {
  // State
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return customsPosts;
    }
    const query = searchQuery.toLowerCase();
    return customsPosts.filter(
      post =>
        post.code.toLowerCase().includes(query) ||
        post.name.toLowerCase().includes(query) ||
        (post.phone && post.phone.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Handle close modal
  const handleCloseModal = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  // Table columns definition - as a function for DataTable
  const getColumns = useCallback(
    (handleRowDeselection: ((rowId: string) => void) | null | undefined) => {
      return getPostColumns({
        onSelectPost,
        onCloseModal: handleCloseModal,
        enableRowSelection: true,
        handleRowDeselection,
      });
    },
    [onSelectPost, handleCloseModal]
  );

  // Handle completed button
  const handleCompleted = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="sm:max-w-4xl">
        <ModalHeader>
          <ModalTitle>Bojxona postlari ma'lumotnomasi</ModalTitle>
        </ModalHeader>

        <ModalBody className="flex flex-col overflow-hidden">
          <DataTable<CustomsPost>
            getColumns={getColumns}
            data={filteredData}
            totalItems={filteredData.length}
            idField="code"
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            pageSize={25}
            config={{
              enableRowSelection: true,
              enableClickRowSelect: true,
              enableSearch: true,
              enableToolbar: true,
              enablePagination: true,
              enableColumnResizing: false,
              enableColumnVisibility: false,
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
  );
}

CustomsPostCatalogModal.displayName = 'CustomsPostCatalogModal';

export default CustomsPostCatalogModal;
