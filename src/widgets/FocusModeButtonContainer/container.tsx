"use client";
import { FocusModeToggleButton } from "@/features/FocusMode/ui/focus-mode-toggle-button";
import { usePathname, useRouter } from "next/navigation";
import { ROUTER_CONFIG, Routes } from "../Sidebar/model/config/sidebar-config";

export const FocusButtonContainer = () => {
  const pathname = usePathname();
  if (pathname !== ROUTER_CONFIG[Routes.test].path) return null;
  return (
    <button className="absolute top-5 z-20 right-6">
      <FocusModeToggleButton />
    </button>
  );
};
