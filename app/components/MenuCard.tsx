import Link from 'next/link'
import { FaGithub, FaLinkedin, FaHome, FaUser, FaToolbox } from "react-icons/fa"

type Props = {}

const MenuCard = (props: Props) => {
  return (
      <div className="space-y-2 relative">
        <p className="mb-4 pr-8">Thoughts on information security, code & automation, and other myriad interests of mine.</p>
        <div className="flex space-x-2 hover:text-lime-400">
          <FaHome className="self-center" /><Link href="/">Home</Link>
        </div>
        <div className="flex space-x-2 hover:text-lime-400">
          <FaToolbox className="self-center" /><Link href="/resources">Resources</Link>
        </div>
        <div className="flex space-x-2 hover:text-lime-400">
          <FaUser className="self-center" /><Link href="/about">About</Link>
        </div>
        <div className="flex space-x-2 hover:text-lime-400">
          <FaGithub className="self-center" /><a href="https://github.com/mattcbarrett">GitHub</a>
        </div>
        <div className="flex space-x-2 hover:text-lime-400">
          <FaLinkedin className="self-center" /><a href="https://www.linkedin.com/in/matt-barrett-7bb48815b/">LinkedIn</a>
        </div>
      </div>
  )
}

export default MenuCard