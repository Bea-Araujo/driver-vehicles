"use client"
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ReduxProvider } from '../../lib/reduxProvider';
import { Inter } from "next/font/google";
import Header from './components/header';
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.title = 'Gobrax';
  }, [])
  return (
    <ReduxProvider>
      <html lang="en">
        <AppRouterCacheProvider>
          <body className={inter.className}>
            <Header />
            <SnackbarProvider maxSnack={3}>
              {children}
            </SnackbarProvider>
          </body>
        </AppRouterCacheProvider>
      </html>

    </ReduxProvider>
  );
}
