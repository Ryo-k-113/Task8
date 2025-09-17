"use client"

import { useState, useEffect } from 'react'
import { useRouter, SubmitHandler, Controller } from 'next/navigation';
import { useForm } from "react-hook-form";
import { Post, Category, PostFormValues } from "@/app/_types/Post";
import { PostForm } from '@/app/admin/posts/_components/PostForm';

export default function NewPostPage () {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
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
    console.log(data.categories)
    const res = await fetch('/api//admin/posts',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
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
        isSubmitting={isSubmitting}
        register={register}
        control={control}
      />
    </div>
  );
}

