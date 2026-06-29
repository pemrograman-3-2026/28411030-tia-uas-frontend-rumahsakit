import { BriefcaseMedical, Clapperboard, ClipboardPlus, Film, Hospital, LayoutDashboard } from "lucide-react";

export const adminMenu = [
  { to: "/admin", icon: Hospital, label: "Dashboard" },
  { to: "/admin/spesialis", icon: ClipboardPlus, label: "Spesialis" },
  { to: "/admin/dokter", icon: BriefcaseMedical, label: "Dokter" },
];

export type IMenu = typeof adminMenu[0]