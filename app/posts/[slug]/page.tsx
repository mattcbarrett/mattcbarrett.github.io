import { notFound } from "next/navigation"
import { getAllPosts } from "@/lib/utilities"
import BlogPost from "@/app/components/BlogPost"

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

  if (!post) notFound()

  return (
    <BlogPost post={post} />
  )
}

export default page