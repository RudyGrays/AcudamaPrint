import { BookCheck, Keyboard, LucideProps, Settings, User } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
export enum Routes {
  settings = "settings",
  test = "test",
  profile = "profile",
  lessons = "lessons",
}
interface CustomRouteProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  path: string;
}
export type RouterConfig = Record<Routes | string, CustomRouteProps>;

export const ROUTER_CONFIG: RouterConfig = {
  [Routes.profile]: {
    icon: User,
    path: "/profile",
  },
  [Routes.lessons]: {
    icon: BookCheck,
    path: "/lessons",
  },
  [Routes.test]: {
    icon: Keyboard,
    path: "/",
  },
  [Routes.settings]: {
    icon: Settings,
    path: "/settings",
  },
};

export const SIDEBAR_ITEMS = Object.keys(ROUTER_CONFIG).map((value) => {
  const currentIcon = ROUTER_CONFIG[value].icon;
  const currentPath = ROUTER_CONFIG[value].path;
  return { icon: currentIcon, path: currentPath, route_name: value };
});
