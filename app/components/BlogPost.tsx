import { Post } from "@/lib/types";
import Markdown from "react-markdown";

type Props = {
  post: Post
}

const BlogPost = (props: Props) => {
  const { post } = props
  return (
    <div>
      <div className="flex justify-between"> 
        <div className="text-xl">
          {post.title}
        </div>
        <div className="text-sm self-center">
          {post.date}
        </div>
      </div>
      <div className="p-x-4">
        <Markdown className="prose text-left max-w-fit text-white">{post.content}</Markdown>
      </div>
      <div className="text-right text-sm">
        -{post.author}
      </div>
    </div>
  )
}

export default BlogPost