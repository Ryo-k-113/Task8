"use client"

import Link from "next/link";
import { useState, useEffect } from 'react'
import { Post } from "@/app/_types/Post";
import './globals.css';
import { supabase } from '@/app/utils/supabase';
import useSWR from 'swr';


export default function Main () {

  const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());
  const { data, error } = useSWR('/api/posts',fetcher);
  console.log(data)

  const posts =  data ? data.posts : [];

  // const [posts, setPosts] = useState<Post[]>([]);
 
  // useEffect(() => {
  //   const fetcher = async () => {
  //     const res = await fetch('/api/posts')
  //     const { posts } = await res.json()
  //     setPosts(posts)
      
  //   }
  //   fetcher()
  // }, [])
 
  // if(!data){
  //   return <div>読み込み中...</div>;
  // } 

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
                    {post.postCategories.map((pc) => {
                      return(
                        <p key={pc.category.id} className="category text-sm text-fuchsia-600 border border-fuchsia-600 rounded-md p-1">{pc.category.name}</p>
                      );
                    })}
                  </div>
                </div>
                <div className="postTitle text-2xl font-medium mt-3">{post.title}</div>
                <p className="postContent mt-3 line-clamp-2" dangerouslySetInnerHTML={{ __html:post.content}} />
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

