import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import { getSession } from "@/auth";

export const metadata: Metadata = {
  title: {
    default: 'DocuKar Admin',
    template: `%s | DocuKar`,
  },
  description: 'DocuKar is a comprehensive platform for storing and managing vehicle and driver documents, with timely renewal reminders and efficient organization for hassle-free documentation.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'DocuKar Admin- Simplify Document Management',
    description: 'Store, manage, and get renewal reminders for vehicle and driver documents with ease using DocuKar.',
    url: 'https://admin.docukar.com/',
    siteName: 'DocuKar Admin',
    images: [
      {
        url: '/public/docukar-d.svg',
        width: 800,
        height: 600,
        alt: 'DocuKar - Simplify Document Management',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
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
