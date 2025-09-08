"use client"

import Link from "next/link";
//import Image from "next/image";
import { useState, useEffect } from 'react'
import { MicroCmsPost } from '@/app/_types/MicroCmsPost'
//import { API_BASE_URL } from "@/app/_constants/postApi";
import './globals.css';


export default function Main () {

  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('https://kyr4a9ylw8.microcms.io/api/v1/posts', { 
        headers: { 
          'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      })
      const { contents } = await res.json()
      setPosts(contents)
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
              <Link href={`/posts/${post.id}`}> 
                <div className="flex justify-between">
                  <p className="postDate text-gray-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
                  <div className="flex gap-x-2 items-center">
                    {post.categories.map((category) => {
                      return(
                        <p key={category.id} className="category text-sm text-fuchsia-600 border border-fuchsia-600 rounded-md p-1">{category.name}</p>
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

