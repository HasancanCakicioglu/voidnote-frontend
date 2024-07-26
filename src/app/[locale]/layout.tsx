import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { StoreProvider } from "@/store/StoreProvider";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VoidNote - Advanced Online Note-Taking Application",
  description: "VoidNote is an advanced online note-taking application that helps you organize your thoughts and tasks efficiently. Features include normal notes, tree-structured notes, to-do lists, and a calendar. Create variables and visualize them graphically on the analysis page.",
  keywords: ["VoidNote", "online note-taking", "note-taking app", "notes", "tree structure notes", "to-do lists", "calendar", "variable tracking", "data visualization", "analysis page"],

};

 
export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Navbar />
              
              <main className="flex flex-grow">{children}</main>
              <Toaster />
            </div>
          </ThemeProvider>
        </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
