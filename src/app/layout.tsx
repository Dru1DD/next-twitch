import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {getServerSession} from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/lib/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quality Work CRM",
  description: "Generated by create next app",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  themeColor: "#ffffff",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <AuthProvider session={session}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
