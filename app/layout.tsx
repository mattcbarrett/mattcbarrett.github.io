import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mattcbarrett",
  description: "myo͞ozings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-12 justify-center items-center bg-zinc-900">
          <div className="w-4/5 space-x-4 space-y-4 text-center">
            <Link href={"/"}>Home</Link>
            <Link href={"/projects"}>Projects</Link>
            <Link href={"/about"}>About</Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
