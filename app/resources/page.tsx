import React from 'react'
import Link from 'next/link'
import Divider from '../components/Divider'

type Props = {}

const ResourcesPage = (props: Props) => {
  return (
    <>
      {/* row 1 */}
      <div className="flex flex-col md:flex-row gap-16 max-w-4xl mx-auto">

        {/* column 1 */}
        <div className="flex flex-col space-y-2">
          <p className="text-2xl font-bold text-center">Tools</p>
          <Divider />
          <Link href="https://virustotal.com" className="hover:text-lime-400">
            Virustotal
          </Link>
          <Link href="https://rawhttp.com/" className="hover:text-lime-400">
            rawhttp
          </Link>
        </div>

        {/* column 2 */}
        <div className="flex flex-col space-y-2">
          <p className="text-2xl font-bold text-center">Education</p>
          <Divider />
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

        {/* column 3 */}
        <div className="flex flex-col space-y-2">
          <p className="text-2xl font-bold text-center">Intel</p>
          <Divider />
          <Link href="https://talkback.sh/" className="hover:text-lime-400">
            talkback.sh
          </Link>
        </div>
      </div>
    </>
  )
}

export default ResourcesPage