import Link from "next/link"
import { FaTags } from "react-icons/fa"

type Props = {
  tags: string[]
  tagsLower: string[]
}

const TagCard = ({ tags, tagsLower }: Props) => {
  const dedupedTags = [...new Set(tags)]
  
  return (
    <div className="p-8 space-y-2 rounded-lg shadow-lg w-full text-left bg-zinc-800">
      <div className="flex space-x-2">
      <FaTags className="self-center" /><p className="prose text-zinc-400">Tags</p>
      </div>
      
      <ul key="list">
        {dedupedTags.map((tag, index) => (
          <li key={index}>
            <Link 
              href={`/tags/${tag.toLowerCase().replaceAll(" ", "-")}`} 
              className="hover:text-zinc-300"
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