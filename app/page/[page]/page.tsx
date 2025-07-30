import React from 'react'
import { getAllPosts, getPaginatedPosts } from '@/app/shared/functions'
import BlogPostTeaser from '@/app/components/BlogPostTeaser'
import Link from 'next/link'

type Props = {
  params: {
    page: string
  }
}

const posts = getAllPosts()
const paginatedPosts = getPaginatedPosts()

export const generateStaticParams = async () => {
  return paginatedPosts.map((page, index) => ({
    page: (index + 1).toString()
  }))
}

const page = () => {
  return (
    <>
      {posts.map((post, index) => (
        <BlogPostTeaser post={post} key={`${post.slug}`}/>
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