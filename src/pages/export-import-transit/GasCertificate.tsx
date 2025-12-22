import { FlameIcon } from 'lucide-react';

export default function GasCertificate() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-3">
        <FlameIcon className="size-8 text-(--color-primary)" />
        <h1 className="font-bold text-3xl">Gas Certificate</h1>
      </div>
      <p className="text-gray-600">
        Energy resources - Gas certificate - Page coming soon...
      </p>
      <div className="mt-4 rounded-md border border-yellow-300 bg-yellow-50 p-3">
        <p className="font-semibold text-sm text-yellow-800">
          🎉 5th Level Deep Nesting!
        </p>
        <p className="mt-1 text-yellow-700 text-xs">
          This is a 5th level nested menu item - deepest level in the system
        </p>
      </div>
      <div className="mt-4 text-gray-500 text-sm">
        Path: /export-import-transit/create-declaration/import-transit/energy-resources/gas-certificate
      </div>
    </div>
  );
}
