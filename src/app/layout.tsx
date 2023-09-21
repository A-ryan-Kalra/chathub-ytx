import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";
import RecoilContextProvider from "../../atoms/modalAtoms";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord-clone",
  description: "Let's create Discord-clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilContextProvider>{children}</RecoilContextProvider>
      </body>
    </html>
  );
}
