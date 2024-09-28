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
    <div className="p-8 rounded-lg shadow-lg w-full bg-zinc-800 hover:bg-zinc-700">
      <Link href={`/posts/${post.slug}`} className="space-y-4">
        <div className="flex justify-between">
          <div className="text-xl">
            {post.title}
          </div>
          <div className="text-sm self-center">
            {post.date}
          </div>
        </div>
        <div className="p-x-4">
          <Markdown className="prose text-left max-w-fit text-zinc-400">{teaser}</Markdown>
        </div>
      </Link>
      <div className="mt-8 flex justify-between">
        <div className="text-sm">
          {post.tags.map((tag, index) => (
            <Link href={`/tags/${tag.toLowerCase().replaceAll(" ", "-")}`} className="hover:text-zinc-300" key={`link-${index}`}>
              {index === (post.tags.length - 1) ? `${tag}` : `${tag}, `}
            </Link>
          ))}
        </div>
        <div className="text-right text-sm">
          -{post.author}
        </div>
      </div>
    </div>
  )
}

export default BlogPostTeaser