import type { Metadata } from 'next';
import AppContextProvider from "@/context/AppContext"
import { Nav } from '@/components';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bathgate Cheer App',
  description: 'Bathgate Cheer App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <Nav/>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
