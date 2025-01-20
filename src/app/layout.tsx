import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/widgets/Sidebar/ui/sidebar";
import { SidebarProvider } from "@/widgets/Sidebar/ui/sidebar-context";
import { Provider } from "@/widgets/Provider/ui/provider";
import { FocusModeToggleButton } from "@/features/FocusMode/ui/focus-mode-toggle-button";
import { SidebarContainer } from "@/widgets/SidebarContainer/sidebar-container";
import { ContentContainer } from "@/widgets/ContentContainer/content-container";
import { Header } from "@/widgets/Header/header";
import { FocusButtonContainer } from "@/widgets/FocusModeButtonContainer/container";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acudama Print",
  description: "Application for training the speed of printing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col relative overflow-hidden`}
      >
        <Provider>
          <FocusButtonContainer />
          <Header />
          <div className="flex max-h-[100%] grow relative ">
            <SidebarContainer />
            <ContentContainer>{children}</ContentContainer>
          </div>
        </Provider>
      </body>
    </html>
  );
}
