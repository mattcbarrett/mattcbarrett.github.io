import { Post } from "@/lib/types";
import Markdown from "react-markdown";

type Props = {
  post: Post
}

const BlogPost = (props: Props) => {
  const { post } = props
  return (
    <div className="container mx-auto lg:max-w-[800px]">
      <div className="relative w-full">
          <img src={post.header_image} alt="header image" className="w-full object-cover" />
          <div className="w-full absolute bottom-0 p-4 bg-black bg-opacity-75">
            <div className="text-xl font-bold">
              {post.title}
            </div>
            <div className="text-sm self-center mt-2">
              {post.date}
            </div>
          </div>
        </div>
      <div className="p-4 mt-4">
        <Markdown 
          className="prose prose-zinc400 max-w-full"
          components={{img:({node,...props})=><img className="mx-auto h-auto md:max-w-[550px]" {...props}/>}}
        >
          {post.content}
        </Markdown>
      </div>
      <div className="text-right text-sm mt-4">
        -{post.author}
      </div>
    </div>
  )
}

export default BlogPost