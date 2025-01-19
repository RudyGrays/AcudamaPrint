"use client";

import { FocusModeProvider } from "@/features/FocusMode/ui/focus-mode-provider";
import { SidebarProvider } from "@/widgets/Sidebar/ui/sidebar-context";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div>
      <h2>Что-то пошло не так.</h2>
      <pre>{error.message}</pre>
    </div>
  );
};

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <FocusModeProvider>
      {/* <ErrorBoundary
        FallbackComponent={(props) => <ErrorFallback error={props.error} />}
      > */}
      <SidebarProvider>{children}</SidebarProvider>
      {/* </ErrorBoundary> */}
    </FocusModeProvider>
  );
};
