import { BriefcaseMedical, ClipboardPlus, FileUser, Hospital } from "lucide-react";

export const adminMenu = [
  { to: "/admin", icon: Hospital, label: "Dashboard" },
  { to: "/admin/spesialis", icon: ClipboardPlus, label: "Spesialis" },
  { to: "/admin/dokter", icon: BriefcaseMedical, label: "Dokter" },
  { to: "/admin/pasien", icon: FileUser, label: "Pasien" },
];

export type IMenu = typeof adminMenu[0]