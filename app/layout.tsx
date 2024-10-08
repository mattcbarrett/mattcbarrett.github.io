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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="5838b6ce-2920-4094-966d-f87a43bb57d4"></script>
      </head>
      <body className={`${inter.className} bg-zinc-900 text-zinc-400`}>
        <div className="flex min-h-4 justify-center items-center">
          {/* <div className="w-4/5 space-x-4 space-y-4 text-center">
            <Link href={"/"}>Home</Link>
            <Link href={"/projects"}>Projects</Link>
            <Link href={"/about"}>About</Link>
          </div> */}
        </div>
        {children}
        {/* <div className="min-h-4" /> */}
      </body>
    </html>
  );
}
