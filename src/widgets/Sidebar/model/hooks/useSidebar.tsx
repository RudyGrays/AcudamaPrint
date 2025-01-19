import { useContext } from "react";
import { SidebarContext } from "../../ui/sidebar-context";

export const useSidebar = () => {
  return useContext(SidebarContext);
};
