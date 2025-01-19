"use client";

import { useFocusMode } from "@/features/FocusMode/model/hooks/useFocusMode";
import { Sidebar } from "../Sidebar/ui/sidebar";

export const SidebarContainer = () => {
  return (
    <div className="z-2 absolute left-[20px] top-0 px-2 h-full flex items-center">
      <Sidebar />
    </div>
  );
};
