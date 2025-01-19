import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

interface SidebarContext {
  isOpen?: boolean;
  sidebarHandler?: (value: boolean) => void;
}

export const SidebarContext = createContext<SidebarContext>({});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarHandler = useCallback((value: boolean) => {
    setIsOpen(value);
  }, []);

  const value = useMemo(() => {
    return {
      isOpen,
      sidebarHandler,
    };
  }, [isOpen, sidebarHandler]);
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
