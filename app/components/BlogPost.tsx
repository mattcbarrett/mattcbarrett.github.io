import { Post } from "@/lib/types";
import Markdown from "react-markdown";

type Props = {
  post: Post
}

const BlogPost = (props: Props) => {
  const { post } = props
  return (
    <>
      <div className="flex justify-between"> 
        <div className="text-xl">
          {post.title}
        </div>
        <div className="text-sm self-center">
          {post.date}
        </div>
      </div>
      <div className="my-4">
        <Markdown className="prose text-left max-w-fit text-zinc-400">{post.content}</Markdown>
      </div>
      <div className="text-right text-sm mt-8">
        -{post.author}
      </div>
    </>
  )
}

export default BlogPost