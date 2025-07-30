import { notFound } from "next/navigation"
import { getAllPosts } from "@/app/shared/functions"
import BlogPost from "@/app/posts/components/BlogPost"

type Props = {
  params: {
    slug: string
  }
}

export const generateStaticParams = async () => {
  return getAllPosts().map((post) => ({
    slug: post.slug
  }))
}

const page = ({ params }: Props) => {
  const post = getAllPosts().find((post) => post.slug === params.slug)

  if (!post) notFound()

  return (
    <BlogPost post={post} />
  )
}

export default page