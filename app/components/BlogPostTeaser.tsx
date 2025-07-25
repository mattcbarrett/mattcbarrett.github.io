'use client'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Post } from "@/app/shared/types"
import Markdown from "react-markdown"
import { FaTags } from "react-icons/fa"
import Divider from "./Divider"

type Props = {
  post: Post
}


const BlogPostTeaser = ({ post }: Props) => {
  const router = useRouter()
  const teaser = post.content.substring(0,550) + "..." //ellipsis so the post's content trails off

  const handleClick = () => {
    router.push(`/posts/${post.slug}`)
  }
  
  return (
    <div className="container mx-auto pl-4 pr-4 lg:pl-0 lg:pr-0">
      <div 
        onClick={handleClick}
        className="cursor-pointer hover:text-lime-400 transition-colors"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
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
          className="pl-2 pr-2 md:pl-4 md:pr-4 pt-4 prose prose-zinc400 max-w-full"
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
      </div>
      <div className="md:pl-4 pl-2 mt-4 flex justify-between">
        <div className="flex">
          <FaTags className="self-center mr-2" />
          <div className="text-sm">  
            {post.tags.map((tag, index) => (
              <Link href={`/tags/${tag.toLowerCase().replaceAll(" ", "-")}`} className="hover:text-lime-400" key={`${post.slug}-${tag}`}>
                {index === (post.tags.length - 1) ? `${tag}` : `${tag}, `}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Divider yMargin={'my-8'}/>
    </div>
  )
}

export default BlogPostTeaser