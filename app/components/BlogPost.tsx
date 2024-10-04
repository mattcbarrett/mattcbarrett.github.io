import { Post } from "@/lib/types";
import Markdown from "react-markdown";

type Props = {
  post: Post
}

const BlogPost = (props: Props) => {
  const { post } = props
  return (
    <div className="space-y-2">
      <div className="text-xl font-bold">
        {post.title}
      </div>
      <div className="text-sm self-center">
        {post.date}
      </div>
      <div className="mt-8">
        <Markdown className="prose prose-zinc400 text-left max-w-fit">{post.content}</Markdown>
      </div>
      <div className="text-right text-sm mt-8">
        -{post.author}
      </div>
    </div>
  )
}

export default BlogPost