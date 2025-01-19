"use client";

import Link from "next/link";
import { SIDEBAR_ITEMS } from "../model/config/sidebar-config";
import { useSidebar } from "../model/hooks/useSidebar";
import { ChevronLeft, ChevronRight, Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useFocusMode } from "@/features/FocusMode/model/hooks/useFocusMode";

export const Sidebar = () => {
  const { isOpen, sidebarHandler } = useSidebar();

  const [canCollapse, setCanCollapse] = useState(false);
  const openedSidebarWidth = 150;
  const closedSidebarWidth = 70;
  const collapseTimeMs = 400;
  const pathname = usePathname();
  const { isFocus } = useFocusMode();

  const [isVisible, setIsVisible] = useState(true);
  const hideTime = 300;

  useEffect(() => {
    if (isFocus) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, hideTime);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [isFocus]);

  useEffect(() => {
    setCanCollapse(false);
    setTimeout(() => {
      setCanCollapse(true);
    }, collapseTimeMs);
  }, [isOpen]);

  return (
    <aside
      style={{
        transition: `.${collapseTimeMs / 100}s`,
        width: `${isOpen ? openedSidebarWidth : closedSidebarWidth}px`,
      }}
      className={
        "h-max rounded-xl transition-all  bg-secondary z-10 border flex flex-col p-2 items-center justify-center relative " +
        ` ${isFocus ? " translate-x-[-200%]" : ""} ` +
        ` ${
          isVisible
            ? " opacity-100 translate-x-0"
            : " opacity-0 translate-x-[-200%]"
        } `
      }
    >
      {!isOpen ? (
        <ChevronRight
          onClick={() => (!!sidebarHandler ? sidebarHandler(true) : null)}
          className="absolute cursor-pointer  top-1/2 translate-y-[-50%] right-[-25px]"
        />
      ) : (
        <ChevronLeft
          onClick={() => (!!sidebarHandler ? sidebarHandler(false) : null)}
          className="absolute cursor-pointer top-1/2 translate-y-[-50%] right-[-25px]"
        />
      )}
      <nav className="flex flex-col gap-5 ">
        {SIDEBAR_ITEMS.map(({ icon: CurrentIcon, path, route_name }) => {
          return (
            <Link
              key={path}
              href={path}
              style={{ transition: ".2s" }}
              className={
                " flex gap-2 rounded-xl p-[0.40rem] items-center  text-sm hover:bg-foreground hover:text-background " +
                ` ${path === pathname ? " bg-foreground text-secondary " : ""}`
              }
            >
              <CurrentIcon />
              {isOpen && canCollapse && (
                <span className="first-letter:uppercase transition">
                  {route_name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
