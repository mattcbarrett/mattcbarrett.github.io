import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getAllPosts } from "@/lib/utilities";
import Sidebar from "./components/Sidebar";

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
  const allPosts = getAllPosts()
  const tags = allPosts.map(post => post.tags).flat().sort()
  const tagsLower = allPosts.map(post => post.tagsLower).flat().sort()


  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="5838b6ce-2920-4094-966d-f87a43bb57d4"></script>
      </head>
      <body className={`${inter.className} bg-zinc-900 text-zinc-400`}>
        <div className="lg:container lg:mx-auto">
          <div className="flex lg:flex-row lg:space-x-16 md:mx-8 flex-col justify-center">
            {/* Move Sidebar component after 3/5th width div to place sidebar on right side of page. Then change parent div to flex-col-reverse to ensure menu button appears at top of page on small viewports. */}
            <Sidebar tags={tags} tagsLower={tagsLower} />
            <div className="flex flex-col lg:max-w-[800px] lg:min-w-[800px] mt-6">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
