import React from 'react'
import Sidebar from '../components/Sidebar'
import { getAllPosts } from '@/lib/utilities'
import Link from 'next/link'

type Props = {}

const ResourcesPage = (props: Props) => {
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
        <div className="flex flex-col lg:min-w-[800px] py-4">
          <div className="flex gap-16 max-w-4xl mx-auto">

            <div className="flex flex-col space-y-2">
              <p className="text-2xl font-bold text-center mb-2">Tools</p>
              <Link href="https://virustotal.com" className="hover:text-lime-400">
                Virustotal
              </Link>
              <Link href="https://rawhttp.com/" className="hover:text-lime-400">
                rawhttp
              </Link>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-2xl font-bold text-center mb-2">Education</p>
              <Link href="https://p.ost2.fyi/courses/" className="hover:text-lime-400">
                OpenSecurityTraining2
              </Link>
              <Link href="https://malwaretech.com/" className="hover:text-lime-400">
                MalwareTech
              </Link>
              <Link href="https://exploitreversing.com/" className="hover:text-lime-400">
                Exploit Reversing
              </Link>
              <Link href="https://www.sectemplates.com/" className="hover:text-lime-400">
                SecTemplates
              </Link>
              <Link href="https://www.thehacker.recipes/" className="hover:text-lime-400">
                The Hacker Recipes
              </Link>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-2xl font-bold text-center mb-2">Intel</p>
              <Link href="https://talkback.sh/" className="hover:text-lime-400">
                talkback.sh
              </Link>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  )
}

export default ResourcesPage