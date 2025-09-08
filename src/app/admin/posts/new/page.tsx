"use client"

import { useState, useEffect } from 'react'
import { useRouter, SubmitHandler } from 'next/navigation';
import { useForm } from "react-hook-form";
import { Post, Category, PostFormValues } from "@/app/_types/Post";
import { PostForm } from '@/app/admin/posts/_components/PostForm';

export default function NewPostPage () {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PostFormValues>({
    defaultValues: {
      title:'',
      content:'',
      thumbnailUrl:'https://placehold.jp/800x400.png',
      categories:[]
    }
  });


  const onSubmit = async(data: PostFormValues) => {

    const { title, content, thumbnailUrl } = data; 
    const res = await fetch('/api//admin/posts',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, content, thumbnailUrl, categories}),
    });

    //記事IDを取得
    const { id } =  await res.json();
    //作成した記事ページに遷移
    router.push(`/admin/posts/${id}`);

    alert('記事を作成しました');
  }

  return (
    <div className="mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-black text-xl font-bold">記事作成</h2>
      </div>
      <PostForm
        mode ="new"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        categories={categories}
        setCategories={setCategories}
        isSubmitting={isSubmitting}
        register={register}
      />
    </div>
  );
}

