"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

interface FocusModeContext {
  isFocus?: boolean;
  focusHandler?: () => void;
}

export const FocusModeContext = createContext<FocusModeContext>({});

export const FocusModeProvider = ({ children }: { children: ReactNode }) => {
  const [isFocus, setIsFocus] = useState(false);

  const focusHandler = useCallback(() => {
    setIsFocus((prev) => !prev);
  }, []);

  const value = useMemo(() => {
    return {
      isFocus,
      focusHandler,
    };
  }, [isFocus, focusHandler]);
  return (
    <FocusModeContext.Provider value={value}>
      {children}
    </FocusModeContext.Provider>
  );
};
