import type { ComponentType, SVGProps } from "react";
import {
  Building2,
  ClipboardList,
  Compass,
  Gauge,
  Globe,
  Handshake,
  LifeBuoy,
  LineChart,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Target,
  TrendingUp,
  Truck,
  Users,
  Workflow,
} from "lucide-react";

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

type IconEntry = {
  component: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
};

/**
 * Curated icon allowlist for the admin icon picker. Only keys in this map
 * can ever be stored in content — the picker only shows these, and the
 * `iconKey` zod enum in schemas.ts is generated from these keys.
 */
export const ICONS = {
  workflow: { component: Workflow, label: "Workflow" },
  gauge: { component: Gauge, label: "Gauge" },
  lineChart: { component: LineChart, label: "Line chart" },
  lifeBuoy: { component: LifeBuoy, label: "Life buoy" },
  mail: { component: Mail, label: "Mail" },
  mapPin: { component: MapPin, label: "Map pin" },
  phone: { component: Phone, label: "Phone" },
  globe: { component: Globe, label: "Globe" },
  building: { component: Building2, label: "Building" },
  users: { component: Users, label: "Users" },
  shieldCheck: { component: ShieldCheck, label: "Shield check" },
  trendingUp: { component: TrendingUp, label: "Trending up" },
  target: { component: Target, label: "Target" },
  compass: { component: Compass, label: "Compass" },
  handshake: { component: Handshake, label: "Handshake" },
  package: { component: Package, label: "Package" },
  truck: { component: Truck, label: "Truck" },
  clipboardList: { component: ClipboardList, label: "Clipboard" },
  linkedin: { component: LinkedinIcon, label: "LinkedIn" },
} as const satisfies Record<string, IconEntry>;

export type IconKey = keyof typeof ICONS;

export function getIcon(key: string) {
  return key in ICONS ? ICONS[key as IconKey].component : ICONS.compass.component;
}
