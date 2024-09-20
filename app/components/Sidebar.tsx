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
      <div className={`flex flex-col w-full space-y-4 mb-4 lg:w-1/5 transition-transform duration-300 lg:block ${isOpen ? 'block' : 'hidden'} `}>
        <MenuCard />
        <TagCard tags={tags} tagsLower={tagsLower} />
      </div>
      <div className="lg:hidden p-4 ml-auto">
        <button
          className="text-zinc-300 focus:outline-none"
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
    </>
  )
}

export default Sidebar