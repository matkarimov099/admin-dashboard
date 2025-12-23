import { FileTextIcon } from 'lucide-react';

export default function CustomsTerritory() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-3">
        <FileTextIcon className="size-8 text-(--color-primary)" />
        <h1 className="font-bold text-3xl">Customs Territory</h1>
      </div>
      <p className="text-gray-600">
        Tolling operations within customs territory - Page coming soon...
      </p>
      <div className="mt-4 text-gray-500 text-sm">
        Path: /export-import-transit/create-declaration/tolling-operations/customs-territory
      </div>
    </div>
  );
}
