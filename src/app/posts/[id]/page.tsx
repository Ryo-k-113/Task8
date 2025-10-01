"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from "next/image";
import { supabase } from '@/utils/supabase';
import useSWR from 'swr';



export default function Article () {
  const { id } = useParams<{ id: string }>();
  
  // const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());
  const fetcher = async (url: string) => {
    const res = await fetch(url);
  
    if (!res.ok) {// レスポンスが成功でなければエラーを投げ,SWRの`error`状態が自動的に設定される
      const error = new Error("データの取得中にエラーが発生しました");
      throw error;
    }
    return res.json();
  }
  const { data, error } = useSWR(
    id ? `/api/posts/${id}` : null,
    fetcher
  );
  console.log(data)

  const post =  data ? data.post : [];

  
  const thumbnailImageUrl = post.thumbnailImageKey
    ? supabase.storage.from("post_thumbnail").getPublicUrl(post.thumbnailImageKey).data.publicUrl
    : null;

  
  if(!data){
    return <div>読み込み中...</div>;
  } 

 

  return (
    <div className="container max-w-3xl mx-auto">
      <div className="articleContents mt-14 px-4">
        <div className="articleThumbnail">
          <Image height={400} width={800} src={thumbnailImageUrl} alt="" />
        </div>
        <div className="post p-4">
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
          <div className="articleTitle text-2xl font-medium mt-3">APIで取得した{post.title}</div>
          <p className="articleText mt-3" dangerouslySetInnerHTML={{ __html:post.content}} />    
        </div>
      </div>
    </div>
  );
}


