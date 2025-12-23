import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  BoltIcon,
  CirclePlusIcon,
  FileTextIcon,
  FlameIcon,
  PackageIcon,
  PlaneIcon,
  RefreshCwIcon,
  ShoppingCartIcon,
  TrainIcon,
  TruckIcon,
  ZapIcon,
} from 'lucide-react';
import { lazy } from 'react';
import type { MenuGroupConfig } from '@/types/navigation';

/**
 * Export/Import/Transit operations menu group
 * Cargo-customs kabi 4-5 darajali nesting bilan
 * Trade operations with deep multi-level nesting
 */
const exportImportTransit: MenuGroupConfig = {
  id: 'group-export-import-transit',
  title: 'navigation.exportImportTransit.title',
  type: 'group',
  icon: <RefreshCwIcon />,
  caption: 'navigation.exportImportTransit.caption',
  roles: [],
  children: [
    {
      id: 'create-declaration',
      title: 'navigation.exportImportTransit.createDeclaration.title',
      type: 'collapse',
      icon: <CirclePlusIcon />,
      roles: [],
      breadcrumbs: true,
      children: [
        // Import Transit - 3rd level nesting
        {
          id: 'import-transit',
          title: 'navigation.exportImportTransit.importTransit.title',
          type: 'collapse',
          icon: <ArrowDownLeftIcon />,
          roles: [],
          breadcrumbs: true,
          children: [
            // Auto Transport
            {
              id: 'auto-transport',
              title: 'navigation.exportImportTransit.autoTransport.title',
              type: 'item',
              path: '/export-import-transit/create-declaration/import-transit/auto-transport',
              icon: <TruckIcon />,
              roles: [],
              component: lazy(() => import('@/pages/export-import-transit/AutoTransport.tsx')),
              breadcrumbs: true,
            },
            // Railway Transport
            {
              id: 'railway-transport',
              title: 'navigation.exportImportTransit.railwayTransport.title',
              type: 'item',
              path: '/export-import-transit/create-declaration/import-transit/railway-transport',
              icon: <TrainIcon />,
              roles: [],
              component: lazy(() => import('@/pages/export-import-transit/RailwayTransport.tsx')),
              breadcrumbs: true,
            },
            // Energy Resources - 4th level nesting!
            {
              id: 'energy-resources',
              title: 'navigation.exportImportTransit.energyResources.title',
              type: 'collapse',
              icon: <BoltIcon />,
              roles: [],
              breadcrumbs: true,
              children: [
                // Gas Certificate - 5th level!
                {
                  id: 'gas-certificate',
                  title: 'navigation.exportImportTransit.gasCertificate.title',
                  type: 'item',
                  path: '/export-import-transit/create-declaration/import-transit/energy-resources/gas-certificate',
                  icon: <FlameIcon />,
                  roles: [],
                  component: lazy(() => import('@/pages/export-import-transit/GasCertificate.tsx')),
                  breadcrumbs: true,
                },
                // Electric Energy - 5th level!
                {
                  id: 'electric-energy',
                  title: 'navigation.exportImportTransit.electricEnergy.title',
                  type: 'item',
                  path: '/export-import-transit/create-declaration/import-transit/energy-resources/electric-energy',
                  icon: <ZapIcon />,
                  roles: [],
                  component: lazy(() => import('@/pages/export-import-transit/ElectricEnergy.tsx')),
                  breadcrumbs: true,
                },
              ],
            },
            // E-Commerce
            {
              id: 'e-commerce',
              title: 'navigation.exportImportTransit.eCommerce.title',
              type: 'item',
              path: '/export-import-transit/create-declaration/import-transit/e-commerce',
              icon: <ShoppingCartIcon />,
              roles: [],
              component: lazy(() => import('@/pages/export-import-transit/ECommerce.tsx')),
              breadcrumbs: true,
            },
          ],
        },
        // Export - 3rd level
        {
          id: 'export',
          title: 'navigation.exportImportTransit.export.title',
          type: 'item',
          path: '/export-import-transit/create-declaration/export',
          icon: <ArrowUpRightIcon />,
          roles: [],
          component: lazy(() => import('@/pages/export-import-transit/Export.tsx')),
          breadcrumbs: true,
        },
        // Tolling Operations - 3rd level nesting
        {
          id: 'tolling-operations',
          title: 'navigation.exportImportTransit.tollingOperations.title',
          type: 'collapse',
          icon: <PackageIcon />,
          roles: [],
          breadcrumbs: true,
          children: [
            // Customs Territory - 4th level
            {
              id: 'customs-territory',
              title: 'navigation.exportImportTransit.customsTerritory.title',
              type: 'item',
              path: '/export-import-transit/create-declaration/tolling-operations/customs-territory',
              icon: <FileTextIcon />,
              roles: [],
              component: lazy(() => import('@/pages/export-import-transit/CustomsTerritory.tsx')),
              breadcrumbs: true,
            },
            // Outside Customs Territory - 4th level
            {
              id: 'outside-customs-territory',
              title: 'navigation.exportImportTransit.outsideCustomsTerritory.title',
              type: 'item',
              path: '/export-import-transit/create-declaration/tolling-operations/outside-customs-territory',
              icon: <PlaneIcon />,
              roles: [],
              component: lazy(
                () => import('@/pages/export-import-transit/OutsideCustomsTerritory.tsx')
              ),
              breadcrumbs: true,
            },
          ],
        },
      ],
    },
  ],
};

export default exportImportTransit;
