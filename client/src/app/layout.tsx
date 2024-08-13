import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWraper from "./dashboardWraper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "E-Commerce Inventory Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardWraper>{children}</DashboardWraper>
      </body>
    </html>
  );
}
