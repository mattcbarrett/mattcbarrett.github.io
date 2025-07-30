'use client'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Post } from "@/app/shared/types"
import { FaTags } from "react-icons/fa"
import Divider from "./Divider"
import StyledMarkdown from "./StyledMarkdown"

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
        className="relative w-full cursor-pointer hover:text-lime-400 transition-colors"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}>
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
      <StyledMarkdown 
        className="pl-2 pr-2 md:pl-4 md:pr-4 pt-4 prose prose-zinc400 max-w-full"
      >
        {teaser}
      </StyledMarkdown>
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