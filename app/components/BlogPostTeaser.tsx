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
    <>
      {
        <div className="p-8 rounded-lg shadow-lg w-full bg-zinc-800">
          <Link href={`/posts/${post.slug}`} className="space-y-4">
            <div className="flex justify-between">
              <div className="text-xl">
                {post.title}
              </div>
              <div className="text-sm self-center">
                {post.date}
              </div>
            </div>
            <div className="text-justify p-x-4">
              <Markdown>{teaser}</Markdown>
            </div>
            <div className="text-right text-sm">
              -{post.author}
            </div>
          </Link>
        </div>
      }
    </>
  )
}

export default BlogPostTeaser