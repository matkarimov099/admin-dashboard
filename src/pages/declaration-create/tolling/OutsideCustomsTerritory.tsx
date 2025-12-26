import { PlaneIcon } from 'lucide-react';

export default function OutsideCustomsTerritory() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-3">
        <PlaneIcon className="size-8 text-(--color-primary)" />
        <h1 className="font-bold text-3xl">Outside Customs Territory</h1>
      </div>
      <p className="text-gray-600">
        Tolling operations outside customs territory - Page coming soon...
      </p>
      <div className="mt-4 text-gray-500 text-sm">
        Path: /export-import-transit/create-declaration/tolling-operations/outside-customs-territory
      </div>
    </div>
  );
}
