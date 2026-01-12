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
 * Declaration Create operations menu group
 * Simplified structure with max 3 level depth
 */
const declarationCreate: MenuGroupConfig = {
  id: 'group-declaration-create',
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
        // Import - 2nd level
        {
          id: 'import',
          title: 'navigation.exportImportTransit.importTransit.title',
          type: 'collapse',
          icon: <ArrowDownLeftIcon />,
          roles: [],
          breadcrumbs: true,
          children: [
            // Cargo Custom Declaration - 3rd level
            {
              id: 'cargo-custom',
              title: 'navigation.exportImportTransit.cargoCustom.title',
              type: 'item',
              path: '/declaration-create/import/cargo-custom',
              icon: <TruckIcon />,
              roles: [],
              component: lazy(() => import('@/pages/declaration-create/import/CargoCustomDeclaration.tsx')),
              breadcrumbs: true,
            },
            // Railway Transport - 3rd level
            {
              id: 'railway-transport',
              title: 'navigation.exportImportTransit.railwayTransport.title',
              type: 'item',
              path: '/declaration-create/import/railway',
              icon: <TrainIcon />,
              roles: [],
              component: lazy(
                () => import('@/pages/declaration-create/import/RailwayTransport.tsx')
              ),
              breadcrumbs: true,
            },
            // Energy Resources - 3rd level
            {
              id: 'energy-resources',
              title: 'navigation.exportImportTransit.energyResources.title',
              type: 'collapse',
              icon: <BoltIcon />,
              roles: [],
              breadcrumbs: true,
              children: [
                // Gas Certificate - 3rd level (max depth)
                {
                  id: 'gas-certificate',
                  title: 'navigation.exportImportTransit.gasCertificate.title',
                  type: 'item',
                  path: '/declaration-create/import/energy/gas',
                  icon: <FlameIcon />,
                  roles: [],
                  component: lazy(
                    () => import('@/pages/declaration-create/import/Energy/GasCertificate.tsx')
                  ),
                  breadcrumbs: true,
                },
                // Electric Energy - 3rd level (max depth)
                {
                  id: 'electric-energy',
                  title: 'navigation.exportImportTransit.electricEnergy.title',
                  type: 'item',
                  path: '/declaration-create/import/energy/electric',
                  icon: <ZapIcon />,
                  roles: [],
                  component: lazy(
                    () => import('@/pages/declaration-create/import/Energy/ElectricEnergy.tsx')
                  ),
                  breadcrumbs: true,
                },
              ],
            },
            // E-Commerce - 3rd level
            {
              id: 'e-commerce',
              title: 'navigation.exportImportTransit.eCommerce.title',
              type: 'item',
              path: '/declaration-create/import/e-commerce',
              icon: <ShoppingCartIcon />,
              roles: [],
              component: lazy(() => import('@/pages/declaration-create/import/ECommerce.tsx')),
              breadcrumbs: true,
            },
          ],
        },
        // Export - 2nd level
        {
          id: 'export',
          title: 'navigation.exportImportTransit.export.title',
          type: 'item',
          path: '/declaration-create/export',
          icon: <ArrowUpRightIcon />,
          roles: [],
          component: lazy(() => import('@/pages/declaration-create/export/Export.tsx')),
          breadcrumbs: true,
        },
        // Tolling Operations - 2nd level
        {
          id: 'tolling-operations',
          title: 'navigation.exportImportTransit.tollingOperations.title',
          type: 'collapse',
          icon: <PackageIcon />,
          roles: [],
          breadcrumbs: true,
          children: [
            // Customs Territory - 3rd level
            {
              id: 'customs-territory',
              title: 'navigation.exportImportTransit.customsTerritory.title',
              type: 'item',
              path: '/declaration-create/tolling/customs',
              icon: <FileTextIcon />,
              roles: [],
              component: lazy(
                () => import('@/pages/declaration-create/tolling/CustomsTerritory.tsx')
              ),
              breadcrumbs: true,
            },
            // Outside Customs Territory - 3rd level
            {
              id: 'outside-customs-territory',
              title: 'navigation.exportImportTransit.outsideCustomsTerritory.title',
              type: 'item',
              path: '/declaration-create/tolling/outside',
              icon: <PlaneIcon />,
              roles: [],
              component: lazy(
                () => import('@/pages/declaration-create/tolling/OutsideCustomsTerritory.tsx')
              ),
              breadcrumbs: true,
            },
          ],
        },
      ],
    },
  ],
};

export default declarationCreate;
