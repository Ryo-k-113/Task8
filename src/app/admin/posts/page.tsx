"use client"

import Link from "next/link";
import { useState, useEffect } from 'react'
import { Post } from "@/app/_types/Post";


export default function AdminPosts () {

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/admin/posts')
      const { posts } = await res.json()
      setPosts(posts)
      setLoading(false)
    }
    fetcher()
  }, [])
 
  if(loading){
    return <div>読み込み中...</div>;
  } 

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between mb-6">
        <h2 className="text-black text-xl font-bold">記事一覧</h2>
        <button className="text-white font-bold bg-blue-500 px-4 py-2 rounded-md">
          <Link href={'/admin/posts/new'}>新規作成</Link> 
        </button>
      </div>
      <ul>
        {posts.map(post =>  {
          return(
            <li key={post.id} className="postList bg-white border-b border-gray-300 hover:bg-gray-300 ">
              <Link href={`/admin/posts/${post.id}`}> 
                <div className="p-4">
                  <h3 className="postTitle text-xl font-bold">{post.title}</h3>
                  <p className="postDate text-gray-500 text-md">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

