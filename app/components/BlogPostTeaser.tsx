import Link from "next/link";
import { Post } from "@/lib/types";
import Markdown from "react-markdown";

type Props = {
  post: Post
}

const BlogPostTeaser = (props: Props) => {
  const { post } = props
  const teaser = post.content.substring(0,350) + "..." //ellipsis so the post's content trails off
  
  return (
    <div className="p-8 rounded-lg shadow-lg w-full bg-zinc-800">
      <Link href={`/posts/${post.slug}`} className="space-y-4">
        <div className="flex justify-between hover:text-zinc-300">
          <div className="text-xl">
            {post.title}
          </div>
          <div className="text-sm self-center">
            {post.date}
          </div>
        </div>
        <div className="p-x-4 hover:text-zinc-300">
          <Markdown className="prose text-left max-w-fit text-zinc-400 hover:text-zinc-300">{teaser}</Markdown>
        </div>
        <div className="flex justify-between">
          <div className="text-sm">
            {post.tags.map((tag, index) => (
              <Link href={`/tags/${tag.toLowerCase().replaceAll(" ", "-")}`} className="hover:text-zinc-300">
                {`${tag}, `}
              </Link>
            ))}
          </div>

          <div className="text-right text-sm">
            -{post.author}
          </div>
        </div>
        
      </Link>
    </div>
  )
}

export default BlogPostTeaser