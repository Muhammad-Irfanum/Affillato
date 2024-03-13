import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@components/navbar";
import Notification from "./components/Notification";
import AuthSession from "./components/AuthSession";
import { ComparisonProvider } from "./components/context/ComparisonContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Affilato | Affiliate Website",
  description: "You can find the best products here.",
  icons: [
    {
      rel: "icon",
      url: "/cat.png",
    },
    {
      rel: "apple-touch-icon",
      url: "/cat.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthSession>
      <ComparisonProvider>
        <html lang="en">
          <body className={inter.className}>

            {children}
            <Notification />
          </body>

        </html>
      </ComparisonProvider>
    </AuthSession>
  );
}
