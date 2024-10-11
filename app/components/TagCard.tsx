import Link from "next/link"
import { FaTags } from "react-icons/fa"

type Props = {
  tags: string[]
  tagsLower: string[]
}

const TagCard = ({ tags, tagsLower }: Props) => {
  const dedupedTags = [...new Set(tags)]
  
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
            >
              {`${tag} (${tags.filter(e => e === tag).length})`}
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-400 to-transparent" />
    </div>
  )
}

export default TagCard