"use client"

import Link from "next/link";
//import Image from "next/image";
import { useState, useEffect } from 'react'
import { Post } from '@/app/_types/post'
import { API_BASE_URL } from "@/app/_api/postApi";
import './globals.css';



export default function Main () {

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(API_BASE_URL)
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
    <main className="max-w-3xl mx-auto">
      <ul>
        {posts.map(post =>  {
          return(
            <li key={post.id} className="postList border border-gray-300 mt-10 pl-4 pr-12 py-4">
              <Link href={`/articles/${post.id}`}> 
                <div className="flex justify-between">
                  <p className="postDate text-gray-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
                  <div className="flex gap-x-2 items-center">
                    {post.categories.map((category) => {
                      return(
                        <p key={category} className="category text-sm text-fuchsia-600 border border-fuchsia-600 rounded-md p-1">{category}</p>
                      );
                    })}
                  </div>
                </div>
                <div className="postTitle text-2xl font-medium mt-3">APIで取得した{post.title}</div>
                <p className="postContent mt-3 line-clamp-2" dangerouslySetInnerHTML={{ __html:post.content}} />
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

