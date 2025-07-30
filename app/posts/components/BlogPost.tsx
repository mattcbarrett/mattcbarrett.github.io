import { Post } from "@/app/shared/types";
import StyledMarkdown from "@/app/components/StyledMarkdown";

type Props = {
  post: Post
}

const BlogPost = ({ post }: Props) => {
  return (
    <>
      <div className="relative w-full">
        <img src={post.header_image} alt="header image" className="w-full object-cover" />
        <div className="w-full absolute bottom-0 md:p-4 p-2 bg-black bg-opacity-75">
          <div className="md:text-xl text-base font-bold">
            {post.title}
          </div>
          <div className="md:text-sm text-xs italic">
            {post.date}
          </div>
        </div>
      </div>
      <div className="md:pl-4 md:pr-4 pl-2 pr-2 mt-4">
        <StyledMarkdown className="prose prose-zinc400 max-w-full">
          {post.content}
        </StyledMarkdown>
      </div>
      <div className="mt-4 md:ml-4 ml-2 mb-4 text-sm italic">
        -{post.author}
      </div>
    </>
  )
}

export default BlogPost