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
        <div className="flex flex-col-reverse lg:flex-row lg:space-x-8 justify-center">
          <div className="flex flex-col w-full lg:w-3/5 space-y-4 items-center justify-start mb-4">
            <div className="p-8 space-y-4 rounded-lg shadow-lg w-full bg-zinc-800">
              <div className="text-justify">
               self description
              </div>
            </div>
          </div>
          <Sidebar tags={tags} tagsLower={tagsLower} />     
        </div>
      </div>
    </div>
  )
}

export default AboutPage