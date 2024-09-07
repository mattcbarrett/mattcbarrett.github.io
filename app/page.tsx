import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa"
import BlogPostTeaser from "./components/BlogPostTeaser";
import Sidebar from "./components/Sidebar";
import { getAllPosts } from "@/lib/utilities";
import PostTags from "./components/PostTags";

export default function Home() {
  const posts = getAllPosts()
  const tags = 
    posts
      .map(post => post.tags)
      .flat()
      .sort()
  const tagsLower = 
    posts
      .map(post => post.tagsLower)
      .flat()
      .sort()

  return (
    <div className="flex space-x-8 items-center justify-center">
      <div className="lg:w-4/5 md:w-full mx-auto">
      {/* <div className="my-4 h-px border-t-0 bg-gray-4my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-lime-500 to-transparent opacity-25 dark:via-lime-400 mx-8" /> */}
        <div className="flex flex-col lg:flex-row lg:space-x-8 justify-center">
          <div className="flex flex-col w-full lg:w-3/5 items-center justify-start">
            {posts.map((post, index) => (
              <div key={`${post}-${index}-div1`}>
                <BlogPostTeaser post={post} key={post.slug} />
                <div className="my-4" key={`${post}-${index}-div2`}/>
                {/* <div className="my-4 h-px border-t-0 bg-gray-4my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-lime-500 to-transparent opacity-25 dark:via-lime-400"  key={`${post}-${index}-div2`}/> */}
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full space-y-4 lg:w-1/5">
            <Sidebar />
            <PostTags tags={tags} tagsLower={tagsLower} />
          </div>
        </div>
      </div>
    </div>
  );
}