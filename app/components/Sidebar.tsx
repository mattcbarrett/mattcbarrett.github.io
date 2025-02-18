'use client'
import { useState } from 'react'
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
  
  return (
    <>
      <div className="lg:hidden ml-auto mr-4">
        <button
          className="text-zinc-300 focus:outline-none"
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <div className={`flex flex-col py-4 space-y-8 ml-4 mr-4 lg:sticky lg:top-0 lg:h-screen lg:w-1/5 max-w-[800px] mx-auto transition-transform duration-300 lg:block ${isOpen ? 'block' : 'hidden'} `}>
        <MenuCard />
        <TagCard tags={tags} tagsLower={tagsLower} />
      </div>
    </>
  )
}

export default Sidebar