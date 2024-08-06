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
      <div className="text-justify p-x-4">
        <Markdown>{post.content}</Markdown>
      </div>
      <div className="text-right text-sm">
        -{post.author}
      </div>
    </>
  )
}

export default BlogPost