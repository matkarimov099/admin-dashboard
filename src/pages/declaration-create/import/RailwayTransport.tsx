import { TrainIcon } from 'lucide-react';

export default function RailwayTransport() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-3">
        <TrainIcon className="size-8 text-(--color-primary)" />
        <h1 className="font-bold text-3xl">Railway Transport</h1>
      </div>
      <p className="text-gray-600">Import transit via railway transport - Page coming soon...</p>
      <div className="mt-4 text-gray-500 text-sm">
        Path: /export-import-transit/create-declaration/import-transit/railway-transport
      </div>
    </div>
  );
}
