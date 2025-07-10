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
    <div className="lg:container lg:mx-auto">
      <div className="flex lg:flex-row lg:space-x-16 md:mx-8 flex-col justify-center">
        {/* Move Sidebar component after 3/5th width div to place sidebar on right side of page. Then change parent div to flex-col-reverse to ensure menu button appears at top of page on small viewports. */}
        <Sidebar tags={tags} tagsLower={tagsLower} />   
        <div className="flex flex-col lg:max-w-[800px] py-4">
          <p className="prose prose-zinc400 text-left ml-4">
            {"Most of my knowledge was gained from forums or blogs such as this, and I've come to share the philosophy that knowledge should be free. This site is a meager contribution."}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage