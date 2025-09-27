"use client"

import { useState, useEffect } from 'react'
import { useRouter, SubmitHandler, Controller } from 'next/navigation';
import { useForm } from "react-hook-form";
import { Post, Category, PostFormValues } from "@/app/_types/Post";
import { PostForm } from '@/app/admin/posts/_components/PostForm';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import Image from "next/image";


export default function NewPostPage () {
  const router = useRouter();
  const { token } = useSupabaseSession();
  const [thumbnailImageKey, setThumbnailImageKey] = useState('')
  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm<PostFormValues>({
    defaultValues: {
      title:'',
      content:'',
      thumbnailImageKey: '',
      categories:[]
    }
  });
  

  const onSubmit = async(data: PostFormValues) => {
    
    const res = await fetch('/api//admin/posts',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
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
        setValue={setValue}
        thumbnailImageKey={thumbnailImageKey}
        setThumbnailImageKey={setThumbnailImageKey}
      />
    </div>
  );
}

