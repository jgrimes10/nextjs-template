"use client";

import { useRouter } from "next/navigation";
import { JSX, ReactNode } from "react";

import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Set up the HeroUIProvider.
 * @param {ReactNode} children The children of the provider.
 * @returns {JSX.Element} The provider.
 */
export default function Providers({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const router = useRouter();
  return (
    <SessionProvider>
      <HeroUIProvider
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        navigate={router.push}
        className="flex h-full w-full flex-col"
      >
        <NextThemesProvider attribute="class">{children}</NextThemesProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
