import React from 'react'
import { getAllPosts } from '@/lib/utilities'
import { Post } from '@/lib/types'
import BlogPostTeaser from '@/app/components/BlogPostTeaser'
import Sidebar from '@/app/components/Sidebar'
import Link from 'next/link'

type Props = {
  params: {
    page: string
  }
}

export const generateStaticParams = async () => {
  const allPosts = getAllPosts()
  const paginatedPosts: Post[][] = []

  for (let i = 0; i < allPosts.length; i += 2) {
    paginatedPosts.push(allPosts.slice(i, i + 2))
  }

  const map = paginatedPosts.map((page, index) => ({
    page: (index + 1).toString() //add 1 so index 0 becomes 1 and we can say "page 1" in the route
  }))

  return map
}

const page = ({ params }: Props) => {
  const { page } = params

  const allPosts = getAllPosts()

  const tags = 
  allPosts
    .map(post => post.tags)
    .flat()
    .sort()

const tagsLower = 
  allPosts
    .map(post => post.tagsLower)
    .flat()
    .sort()

  const paginatedPosts: Post[][] = []

  for (let i = 0; i < allPosts.length; i += 2) {
    paginatedPosts.push(allPosts.slice(i, i + 2))
  }

  const posts = paginatedPosts[(Number(page) - 1)] //Subtract 1 so the page number from the route matches the correct array index

  return (
    <div className="flex space-x-8 items-center justify-center">
      <div className="lg:w-4/5 md:w-full mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-8 justify-center">
          {/* Move Sidebar component after 3/5th width div to place sidebar on right side of page. Then change parent div to flex-col-reverse to ensure menu button appears at top of page on small viewports. */}
          <Sidebar tags={tags} tagsLower={tagsLower} />
          <div className="flex flex-col w-full lg:w-3/5 justify-start space-y-4">
            {posts.map((post, index) => (
              <BlogPostTeaser post={post} key={`item-${index}`}/>
            ))}
            <div className="text-center space-x-2 mb-4">
              {paginatedPosts.map((page, index) => (
                <Link href={`/page/${index + 1}`}>{index + 1}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page