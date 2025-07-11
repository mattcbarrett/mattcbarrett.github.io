import React from 'react'
import { getAllPosts } from '@/lib/utilities'
import { Post } from '@/lib/types'
import BlogPostTeaser from '@/app/components/BlogPostTeaser'
import Link from 'next/link'

type Props = {
  params: {
    page: string
  }
}

export const generateStaticParams = async () => {
  const allPosts = getAllPosts()
  const paginatedPosts: Post[][] = []

  for (let i = 0; i < allPosts.length; i += 5) { // Need to turn this into a function for re-use below and in /app.tsx
    paginatedPosts.push(allPosts.slice(i, i + 5))
  }

  const map = paginatedPosts.map((page, index) => ({
    page: (index + 1).toString() //add 1 so index 0 becomes 1 and we can say "page 1" in the route
  }))

  return map
}

const page = ({ params }: Props) => {
  const { page } = params

  const allPosts = getAllPosts()

  const paginatedPosts: Post[][] = []

  for (let i = 0; i < allPosts.length; i += 5) { // Need to turn this into a function for re-use above and in /app.tsx
    paginatedPosts.push(allPosts.slice(i, i + 5))
  }

  const posts = paginatedPosts[(Number(page) - 1)] //Subtract 1 so the page number from the route matches the correct array index

  return (
    <>
      {posts.map((post, index) => (
        <BlogPostTeaser post={post} key={`item-${index}`}/>
      ))}
      <div className="text-center space-x-2 mb-4">
        {paginatedPosts.map((page, index) => (
          <Link href={`/page/${index + 1}`} key={`page-${index + 1}`}>{index + 1}</Link>
        ))}
      </div>
    </>
  )
}

export default page