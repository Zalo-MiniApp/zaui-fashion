// constants/carrierIconMap.ts
import { PackageDeliveryIcon, ShipperIcon } from '@/components/Vectors';

export const carrierIconMap = {
  COD: <ShipperIcon />,
  INSTORE: <PackageDeliveryIcon />,
} as const;
