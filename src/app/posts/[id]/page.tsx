"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from "next/image";
import { MicroCmsPost } from '@/app/_types/MicroCmsPost';



export default function Article () {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://kyr4a9ylw8.microcms.io/api/v1/posts/${id}`,
        {
          headers: {
            'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        },
      )
      const data = await res.json()
      setPost(data)
      setLoading(false)
    }

    fetcher()
  }, [id])

  
  if(loading){
    return <div>読み込み中...</div>;
  } 

  if(!post) {
    return <div>記事が見つかりません</div>;
  }

  return (
    <div className="container max-w-3xl mx-auto">
      <div className="articleContents mt-14 px-4">
        <div className="articleThumbnail">
          <Image height={400} width={800} src={post.thumbnail.url} alt="" />
        </div>
        <div className="post p-4">
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
          <div className="articleTitle text-2xl font-medium mt-3">APIで取得した{post.title}</div>
          <p className="articleText mt-3" dangerouslySetInnerHTML={{ __html:post.content}} />    
        </div>
      </div>
    </div>
  );
}


