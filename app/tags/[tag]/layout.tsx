import { getAllPosts } from "@/lib/utilities"
import Sidebar from "@/app/components/Sidebar"
import PostTags from "@/app/components/PostTags"

export default function PostLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  const posts = getAllPosts()
  const tags = 
    posts
      .map(post => post.tags)
      .flat()
      .sort()
  const tagsLower = 
    posts
      .map(post => post.tagsLower)
      .flat()
      .sort()

  return (
    <div className="flex space-x-8 items-center justify-center">
      <div className="lg:w-4/5 md:w-full mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-8 justify-center">
          <div className="flex flex-col w-full lg:w-3/5 justify-start space-y-4">
            {children}
          </div>
          <div className="flex flex-col w-full space-y-4 lg:w-1/5">
            <Sidebar />
            <PostTags tags={tags} tagsLower={tagsLower} />
          </div>        
        </div>
      </div>
    </div>
  )
}