import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import "./globals.css";
import { cn } from '@/lib/utils'
const fontSans = FontSans({
  subsets:['latin'],
  variable:'--font-sans'
})



export const metadata: Metadata = {
  title: "Clashing App",
  description: "Get Your Audience Thought",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
