import BlogPostTeaser from "./components/BlogPostTeaser"
import { getAllPosts, paginatePosts } from "@/app/shared/functions"
import Link from "next/link"

export default function Home() {
  const posts = getAllPosts()
  const paginatedPosts = paginatePosts(posts)

  return (
    <>
      {posts.map((post, index) => (
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