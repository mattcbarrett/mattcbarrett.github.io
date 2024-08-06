import { FaGithub, FaLinkedin } from "react-icons/fa"

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className="flex flex-col w-1/5 items-center justify-start">
      <div className="p-8 space-y-2 rounded-lg shadow-lg w-full text-left bg-zinc-800">
        <p className="mb-4">Thoughts on information security, code & automation, and other myriad interests of mine.</p>
        <div className="flex space-x-2">
          <FaGithub className="self-center"/><a href="https://github.com/mattcbarrett">GitHub</a>
        </div>
        <div className="flex space-x-2">
          <FaLinkedin className="self-center"/><a href="https://www.linkedin.com/in/matt-barrett-7bb48815b/">LinkedIn</a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar