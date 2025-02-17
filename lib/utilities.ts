import fs from "fs"
import matter from "gray-matter"
import { join } from "path"
import { Post } from "@/lib/types"

const contentDir = join(process.cwd(), "content")

export const getFilenames = () => {
  return fs.readdirSync(contentDir)
}

export const getPostFromFile = (filename: string) => {
  const slug = filename.replace(/\.md$/, "")
  const fullPath = join(contentDir, filename)
  const fileContents = fs.readFileSync(fullPath, "utf-8")
  const { data, content } = matter(fileContents)

  return { ...data, slug, content } as Post
}

export const getAllPosts = () => {
  const files = getFilenames()
  const posts = files
  .map((filename) => getPostFromFile(filename))
  .map(post => {
    post.tagsLower = post.tags.map(tag => tag.toLowerCase().replaceAll(" ", "-"))
    return post
  })
  .sort(
    (post1, post2) => {
      let firstPostDate = (new Date(post1.date)).getTime()
      let secondPostDate = (new Date(post2.date)).getTime()
      return firstPostDate > secondPostDate ? -1 : 1
    })
  return posts
}