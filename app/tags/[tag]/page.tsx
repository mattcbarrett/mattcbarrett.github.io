import { notFound } from "next/navigation"
import { getAllPosts } from "@/app/shared/functions"
import BlogPostTeaser from "@/app/components/BlogPostTeaser"

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

  if (!posts) notFound()

  return (
    <>
      {posts.map((post, index) => (
        <BlogPostTeaser post={post} key={`item-${index}`}/>
      ))}
    </>
  )
}

export default page