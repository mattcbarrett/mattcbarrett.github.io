import { Post } from "@/lib/types";
import Markdown from "react-markdown";

type Props = {
  post: Post
}

const BlogPost = (props: Props) => {
  const { post } = props
  return (
    <div className="container mx-auto">
      <div className="text-xl font-bold">
        {post.title}
      </div>
      <div className="text-sm self-center mt-2">
        {post.date}
      </div>
      <div className="mt-8">
        <Markdown 
          className="prose prose-zinc400"
          components={{img:({node,...props})=><img className="mx-auto max-w-full h-auto max-w-[550px]" {...props}/>}}
        >
          {post.content}
        </Markdown>
      </div>
      <div className="text-right text-sm mt-8">
        -{post.author}
      </div>
    </div>
  )
}

export default BlogPost