import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa"
import BlogPostTeaser from "./components/BlogPostTeaser";
import Sidebar from "./components/Sidebar";
import { getAllPosts } from "@/lib/utilities";

export default function Home() {
  const posts = getAllPosts()
  return (
    <div className="flex space-x-8 items-center justify-center bg-zinc-900">
      <div className="lg:w-4/5 md:w-full mx-auto">
        <div className="flex flex-col-reverse lg:flex-row lg:space-x-8 justify-center">
          <div className="flex flex-col w-full lg:w-3/5 space-y-4 items-center justify-start min-h-screen">
            {posts.map((post) => (
              <BlogPostTeaser post={post} key={post.slug} />
            ))}
          </div>
            <Sidebar />
        </div>
      </div>
    </div>
  );
}