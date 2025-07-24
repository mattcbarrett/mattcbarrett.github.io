import Link from "next/link"
import { FaTags } from "react-icons/fa"

type Props = {
  tags: string[]
  tagsLower: string[]
  setIsOpen: (value: boolean) => void
}

const TagCard = ({ tags, tagsLower, setIsOpen }: Props) => {
  const dedupedTags = [...new Set(tags)]

  const handleClick = () => {
    setIsOpen(false)
  }
  
  return (
    // <div className="p-8 space-y-2 rounded-lg shadow-lg w-full text-left bg-zinc-800">
    <div className="space-y-2 relative">
      <div className="flex space-x-2">
        <FaTags className="self-center" /><p className="prose text-zinc-400">Tags</p>
      </div>
      <ul key="list" className="pr-8">
        {dedupedTags.map((tag, index) => (
          <li key={index}>
            <Link 
              href={`/tags/${tag.toLowerCase().replaceAll(" ", "-")}`} 
              className="hover:text-lime-400"
              onClick={handleClick}
            >
              {`${tag} (${tags.filter(e => e === tag).length})`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TagCard