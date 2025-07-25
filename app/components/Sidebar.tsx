'use client'
import { useEffect, useState } from 'react'
import MenuCard from './MenuCard'
import TagCard from './TagCard'
import { FaTimes, FaBars } from 'react-icons/fa'

type Props = {
  tags: any
  tagsLower: any
}

const Sidebar = (props: Props) => {
  const { tags, tagsLower } = props
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setIsOpen(false)
  }, [])
  

  return (
    <>
      <div className="lg:hidden ml-auto mr-4">
        <button
          className="mt-4 text-zinc-300 focus:outline-none"
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <div className={`flex flex-col space-y-8 lg:sticky mx-4 mb-4 lg:ml-4 lg:mt-4 lg:top-0 lg:h-screen max-w-[300px] transition-transform duration-300 lg:block ${isOpen ? 'block' : 'hidden'} `}>
        <MenuCard setIsOpen={setIsOpen} />
        <TagCard tags={tags} tagsLower={tagsLower} setIsOpen={setIsOpen} />
      </div>
    </>
  )
}

export default Sidebar