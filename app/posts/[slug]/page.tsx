import { notFound } from "next/navigation"
import { getAllPosts } from "@/lib/utilities"
import BlogPost from "@/app/components/BlogPost"
import Sidebar from "@/app/components/Sidebar"

type Props = {
  params: any
}

export const generateStaticParams = async () => {
  const posts = getAllPosts()

  const map = posts.map((post) => ({
    slug: post.slug
  }))

  return map
}

const page = ({ params }: Props) => {
  const post = getAllPosts().find((post) => post.slug === params.slug)

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

  if (!post) notFound()

  return (
    <div className="flex items-center justify-center">
      <div className="lg:w-4/5 md:w-full md:px-8 mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-8 justify-center">
          {/* Move Sidebar component after 3/5th width div to place sidebar on right side of page. Then change parent div to flex-col-reverse to ensure menu button appears at top of page on small viewports. */}
          <Sidebar tags={tags} tagsLower={tagsLower} />  
          <div className="flex flex-col w-full lg:w-3/5 space-y-4 items-center justify-start mb-4">
            <div className="pt-8">
              <BlogPost post={post} />
            </div>
          </div>             
        </div>
      </div>
    </div>
  )
}

export default page