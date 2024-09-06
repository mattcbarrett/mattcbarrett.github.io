import { notFound } from "next/navigation"
import { getAllPosts } from "@/lib/utilities"
import BlogPostTeaser from "@/app/components/BlogPostTeaser"

type Props = {
  params: any
}

export const generateStaticParams = async () => {
  const posts = getAllPosts()

  const tags = posts.flatMap((post) => (post.tagsLower))

  const map = tags.map((tag) => ({
    tag: tag
  }))

  return map
}

const page = ({ params }: Props) => {
  const posts = getAllPosts().filter((post) => {
    const postTags = post.tagsLower.map(tags => tags)
    if (postTags.includes(params.tag)) return post
  })

  if (!posts) notFound()

  return (
    <div>
      {posts.map((post) => (
        <BlogPostTeaser post={post} />
      ))}
    </div>
  )
}

export default page