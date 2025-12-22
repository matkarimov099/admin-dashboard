import { ShoppingCartIcon } from 'lucide-react';

export default function ECommerce() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-3">
        <ShoppingCartIcon className="size-8 text-(--color-primary)" />
        <h1 className="font-bold text-3xl">E-Commerce</h1>
      </div>
      <p className="text-gray-600">E-commerce import transit declarations - Page coming soon...</p>
      <div className="mt-4 text-gray-500 text-sm">
        Path: /export-import-transit/create-declaration/import-transit/e-commerce
      </div>
    </div>
  );
}
