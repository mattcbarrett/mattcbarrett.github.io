import { notFound } from "next/navigation"
import { getAllPosts, getAllTags } from "@/app/shared/functions"
import BlogPostTeaser from "@/app/components/BlogPostTeaser"

type Props = {
  params: {
    tag: string
  }
}

export const generateStaticParams = async () => {
  return getAllTags().map(tag => ({ tag: tag }))
}

const page = ({ params }: Props) => {
  const posts = getAllPosts().filter((post) => {
    if (post.tagsLower.includes(params.tag)) return post
  })

  if (!posts) notFound()

  return (
    <>
      {posts.map((post, index) => (
        <BlogPostTeaser post={post} key={`${post.slug}`}/>
      ))}
    </>
  )
}

export default page