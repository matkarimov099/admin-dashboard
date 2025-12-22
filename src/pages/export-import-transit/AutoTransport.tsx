import { TruckIcon } from 'lucide-react';

export default function AutoTransport() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-3">
        <TruckIcon className="size-8 text-(--color-primary)" />
        <h1 className="font-bold text-3xl">Auto Transport</h1>
      </div>
      <p className="text-gray-600">
        Import transit via auto transport - Page coming soon...
      </p>
      <div className="mt-4 text-gray-500 text-sm">
        Path: /export-import-transit/create-declaration/import-transit/auto-transport
      </div>
    </div>
  );
}
