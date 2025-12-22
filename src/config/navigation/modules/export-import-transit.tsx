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
import type { MenuGroupConfig } from '../types/menu';

/**
 * Export/Import/Transit operations menu group
 * Cargo-customs kabi 4-5 darajali nesting bilan
 * Trade operations with deep multi-level nesting
 */
const exportImportTransit: MenuGroupConfig = {
  id: 'group-export-import-transit',
  title: 'exportImportTransit.title',
  type: 'group',
  icon: <RefreshCwIcon />,
  caption: 'exportImportTransit.caption',
  roles: [],
  children: [
    {
      id: 'create-declaration',
      title: 'exportImportTransit.createDeclaration',
      type: 'collapse',
      icon: <CirclePlusIcon />,
      roles: [],
      breadcrumbs: true,
      children: [
        // Import Transit - 3rd level nesting
        {
          id: 'import-transit',
          title: 'exportImportTransit.importTransit',
          type: 'collapse',
          icon: <ArrowDownLeftIcon />,
          roles: [],
          breadcrumbs: true,
          children: [
            // Auto Transport
            {
              id: 'auto-transport',
              title: 'exportImportTransit.autoTransport',
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
              title: 'exportImportTransit.railwayTransport',
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
              title: 'exportImportTransit.energyResources',
              type: 'collapse',
              icon: <BoltIcon />,
              roles: [],
              breadcrumbs: true,
              children: [
                // Gas Certificate - 5th level!
                {
                  id: 'gas-certificate',
                  title: 'exportImportTransit.gasCertificate',
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
                  title: 'exportImportTransit.electricEnergy',
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
              title: 'exportImportTransit.eCommerce',
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
          title: 'exportImportTransit.export',
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
          title: 'exportImportTransit.tollingOperations',
          type: 'collapse',
          icon: <PackageIcon />,
          roles: [],
          breadcrumbs: true,
          children: [
            // Customs Territory - 4th level
            {
              id: 'customs-territory',
              title: 'exportImportTransit.customsTerritory',
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
              title: 'exportImportTransit.outsideCustomsTerritory',
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
