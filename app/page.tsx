import BlogPostTeaser from "./components/BlogPostTeaser";
import Sidebar from "./components/Sidebar";
import { getAllPosts } from "@/lib/utilities";
import { Post } from "@/lib/types";
import Link from "next/link";

export default function Home() {
  const allPosts = getAllPosts()

  const tags = 
    allPosts
      .map(post => post.tags)
      .flat()
      .sort()

  const tagsLower = 
    allPosts
      .map(post => post.tagsLower)
      .flat()
      .sort()

    const paginatedPosts: Post[][] = []
  
    for (let i = 0; i < allPosts.length; i += 5) {
      paginatedPosts.push(allPosts.slice(i, i + 5))
    }

  return (
    <div className="lg:container lg:mx-auto">
      <div className="flex lg:flex-row lg:space-x-16 md:mx-8 mx-4 flex-col justify-center">
        {/* Move Sidebar component after 3/5th width div to place sidebar on right side of page. Then change parent div to flex-col-reverse to ensure menu button appears at top of page on small viewports. */}
        <Sidebar tags={tags} tagsLower={tagsLower} />
        <div className="flex flex-col">
          {allPosts.map((post, index) => (
            <div key={`${post.slug}-${index}-div`}>
              <BlogPostTeaser post={post} key={post.slug} />
            </div>
          ))}
          <div className="text-center space-x-2 m-8">
            {paginatedPosts.map((page, index) => (
              <Link href={`/page/${index + 1}`} key={`page-${index}`} className="hover:text-lime-400">{index + 1}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}