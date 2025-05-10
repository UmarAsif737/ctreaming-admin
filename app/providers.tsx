"use client";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  session: Session | null;
}

export function Providers({ children, themeProps, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <HeroUIProvider>
        <NextThemesProvider
          defaultTheme="light"
          attribute="class"
          {...themeProps}
        >
          <NextTopLoader
            color="#39B54A"
            height={5}
            zIndex={1000000}
            showSpinner={false}
          />
          <Toaster />
          {children}
        </NextThemesProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
