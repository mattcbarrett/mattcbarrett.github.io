import Link from "next/link"

type Props = {
  tags: string[]
  tagsLower: string[]
}

const PostTags = ({ tags, tagsLower }: Props) => {
  const dedupedTags = [...new Set(tags)]
  return (
    <div className="p-8 space-y-2 rounded-lg shadow-lg w-full text-left bg-zinc-800">
      <ul key="list">
        {dedupedTags.map((tag, index) => (
          <li key={index}><Link href={`/tags/${tag.toLowerCase().replaceAll(" ", "-")}`} className="hover:text-zinc-300">{tag}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default PostTags