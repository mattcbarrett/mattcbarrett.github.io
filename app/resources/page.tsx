import React from 'react'
import Sidebar from '../components/Sidebar'
import { getAllPosts } from '@/lib/utilities'
import Link from 'next/link'

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
    <div className="flex items-center justify-center">
      <div className="lg:w-4/5 md:w-full px-8 mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-8 justify-center">
          {/* Move Sidebar component after 3/5th width div to place sidebar on right side of page. Then change parent div to flex-col-reverse to ensure menu button appears at top of page on small viewports. */}
          <Sidebar tags={tags} tagsLower={tagsLower} />   
          <div className="flex flex-col w-full lg:w-3/5 py-8 items-center mb-4">
            <p className="prose prose-zinc400 text-left max-w-fit">
              {"Links to useful stuff."}
            </p>
            <Link href="https://virustotal.com" className="hover:text-lime-400">Virustotal</Link>
            <Link href="https://p.ost2.fyi/courses/" className="hover:text-lime-400">OpenSecurityTraining2</Link>
            <Link href="https://malwaretech.com/" className="hover:text-lime-400">MalwareTech</Link>
            <Link href="https://exploitreversing.com/" className="hover:text-lime-400">Exploit Reversing</Link>
            <Link href="https://www.sectemplates.com/" className="hover:text-lime-400">SecTemplates</Link>
            <Link href="https://talkback.sh/" className="hover:text-lime-400">talkback.sh</Link>
            <Link href="https://www.thehacker.recipes/" className="hover:text-lime-400">The Hacker Recipes</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage