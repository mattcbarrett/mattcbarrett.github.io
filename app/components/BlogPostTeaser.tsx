import Link from "next/link";
import { Post } from "@/lib/types";
import Markdown from "react-markdown";
import { FaTags } from "react-icons/fa";

type Props = {
  post: Post
}

const BlogPostTeaser = (props: Props) => {
  const { post } = props
  const teaser = post.content.substring(0,350) + "..." //ellipsis so the post's content trails off

  return (
    <div className="container mx-auto mt-8">
      <Link href={`/posts/${post.slug}`} className="lg:hover:text-lime-400">
        <div className="text-xl font-bold">
          {post.title}
        </div>
        <div className="text-sm self-center mt-2">
          {post.date}
        </div>
        <Markdown className="prose prose-zinc400">{teaser}</Markdown>
      </Link>
      <div className="mt-8 flex justify-between">
        <div className="flex">
          <FaTags className="self-center mr-2" />
          <div className="text-sm">  
            {post.tags.map((tag, index) => (
              <Link href={`/tags/${tag.toLowerCase().replaceAll(" ", "-")}`} className="hover:text-lime-400" key={`link-${index}`}>
                {index === (post.tags.length - 1) ? `${tag}` : `${tag}, `}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="h-px bg-transparent bg-gradient-to-r from-transparent via-zinc-400 to-transparent mt-8"/>
    </div>
  )
}

export default BlogPostTeaser