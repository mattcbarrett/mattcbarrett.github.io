import React from 'react'
import Sidebar from '../components/Sidebar'
import { getAllPosts } from '@/lib/utilities'

type Props = {}

const AboutPage = (props: Props) => {
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

  return (
    <div className="flex space-x-8 items-center justify-center">
      <div className="lg:w-4/5 md:w-full mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-8 justify-center">
          {/* Move Sidebar component after 3/5th width div to place sidebar on right side of page. Then change parent div to flex-col-reverse to ensure menu button appears at top of page on small viewports. */}
          <Sidebar tags={tags} tagsLower={tagsLower} />   
          <div className="flex flex-col w-full lg:w-3/5 space-y-4 items-center mb-4">
            <div className="p-8 rounded-lg shadow-lg w-full bg-zinc-800">
              <p className="prose prose-zinc400 text-left max-w-fit">
                {"I've learned a great deal from others over the years, benefitting from the idea that knowledge should be free. This is my effort to practice that same philosophy, contribute to the community that's helped me succeed, and pass on my own knowledge so others may benefit in the same way."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage