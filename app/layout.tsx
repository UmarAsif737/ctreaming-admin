import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import { getSession } from "@/auth";

export const metadata: Metadata = {
  title: {
    default: 'Ctreaming Admin',
    template: `%s | Ctreaming`,
  },
  description: 'Will add description soon',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  // openGraph: {
  //   title: 'Ctreaming Admin',
  //   description: 'Will Add soon',
  //   url: '/',
  //   siteName: 'DocuKar Admin',
  //   images: [
  //     {
  //       url: '/public/docukar-d.svg',
  //       width: 800,
  //       height: 600,
  //       alt: 'DocuKar - Simplify Document Management',
  //     },
  //   ],
  //   locale: 'en_US',
  //   type: 'website',
  // },
  viewport: 'width=device-width, initial-scale=1.0',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={clsx("font-sans antialiased", fontSans.className)}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
