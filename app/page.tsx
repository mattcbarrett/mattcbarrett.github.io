import BlogPostTeaser from "./components/BlogPostTeaser"
import { getAllPosts } from "@/lib/utilities"
import { Post } from "@/lib/types"
import Link from "next/link"

export default function Home() {
  const allPosts = getAllPosts()

    const paginatedPosts: Post[][] = []
  
    for (let i = 0; i < allPosts.length; i += 5) {
      paginatedPosts.push(allPosts.slice(i, i + 5))
    }

  return (
    <>
      {allPosts.map((post, index) => (
          <BlogPostTeaser post={post} key={post.slug} />
      ))}
      <div className="text-center space-x-2 mb-8">
        {paginatedPosts.map((page, index) => (
          <Link href={`/page/${index + 1}`} key={`page-${index}`} className="hover:text-lime-400">{index + 1}</Link>
        ))}
      </div>
    </>
  );
}