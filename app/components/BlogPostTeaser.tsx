import Link from "next/link";
import { Post } from "@/lib/types";
import Markdown from "react-markdown";
import { FaTags } from "react-icons/fa";

type Props = {
  post: Post
}

const BlogPostTeaser = (props: Props) => {
  const { post } = props
  const teaser = post.content.substring(0,550) + "..." //ellipsis so the post's content trails off

  return (
    <div className="container mx-auto">
      <Link href={`/posts/${post.slug}`} className="hover:text-lime-400">
        <div className="relative w-full">
          <img src={post.header_image} alt="header image" className="w-full object-cover" />
          <div className="w-full absolute bottom-0 md:p-4 p-2 bg-black bg-opacity-75">
            <div className="md:text-xl text-md font-bold">
              {post.title}
            </div>
            <div className="md:text-sm text-xs italic">
              {post.date}
            </div>
          </div>
        </div>
        <Markdown 
          className="md:pl-4 md:pr-4 pl-2 pr-4 pt-4 prose prose-zinc400 max-w-full"
          components={
            {
              img: ({node,...props})=><img className="mx-auto h-auto md:max-w-[550px]" {...props}/>,
              h1: ({node,...props})=><h1 className="md:text-xl text-base" {...props}/>,
              h2: ({node,...props})=><h2 className="md:text-xl text-base" {...props}/>,
              h3: ({node,...props})=><h3 className="md:text-xl text-base" {...props}/>
            }
          }>
          {teaser}
        </Markdown>
      </Link>
      <div className="md:pl-4 pl-2 mt-4 flex justify-between">
        <div className="flex">
          <FaTags className="self-center mr-2" />
          <div className="text-sm">  
            {post.tags.map((tag, index) => (
              <Link href={`/tags/${tag.toLowerCase().replaceAll(" ", "-")}`} className="hover:text-lime-400" key={`link-${index}`}>
                {index === (post.tags.length - 1) ? `${tag}` : `${tag}, `}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="h-px bg-transparent bg-gradient-to-r from-transparent via-zinc-400 to-transparent my-8"/>
    </div>
  )
}

export default BlogPostTeaser