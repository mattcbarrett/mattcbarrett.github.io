import { notFound } from "next/navigation"
import { getAllPosts } from "@/lib/utilities"
import BlogPostTeaser from "@/app/components/BlogPostTeaser"
import Sidebar from "@/app/components/Sidebar"

type Props = {
  params: any
}

export const generateStaticParams = async () => {
  const posts = getAllPosts()

  const tagsLower = posts.flatMap((post) => (post.tagsLower))

  const map = tagsLower.map((tag) => ({
    tag: tag
  }))

  return map
}

const page = ({ params }: Props) => {
  const posts = getAllPosts().filter((post) => {
    const postTags = post.tagsLower.map(tags => tags)
    if (postTags.includes(params.tag)) return post
  })

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

  if (!posts) notFound()

  return (
    <div className="flex items-center justify-center">
      <div className="lg:w-4/5 md:w-full px-8 mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-8 justify-center">
          {/* Move Sidebar component after 3/5th width div to place sidebar on right side of page. Then change parent div to flex-col-reverse to ensure menu button appears at top of page on small viewports. */}
          <Sidebar tags={tags} tagsLower={tagsLower} />
          <div className="flex flex-col w-full lg:w-3/5 justify-start space-y-4">
            {posts.map((post, index) => (
              <BlogPostTeaser post={post} key={`item-${index}`}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page