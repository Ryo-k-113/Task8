"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation';
import Image from "next/image";
import { useForm, Controller, SubmitHandler, FieldValues, UseFormRegister, UseFormHandleSubmit, UseFormState  } from 'react-hook-form';
import { Post, PostFormValues, Category } from "@/app/_types/Post";
import { PostForm } from '@/app/admin/posts/_components/PostForm'
import AdminCategories from '../../categories/page';
import { useDataFetch } from "@/app/admin/_hooks/useDataFetch";
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';


export default function AdminPost () {
  
  const { id } = useParams();
  const router = useRouter();
  const { token } = useSupabaseSession();

  const [thumbnailImageKey, setThumbnailImageKey] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting },
  } = useForm<PostFormValues>({
    defaultValues: {
      title: "",
      content: "",
      thumbnailImageKey:"",
      categories:[],
    },
  });

  const { data, error, isLoading } = useDataFetch(
    id ? `/api/admin/posts/${id}` : null
  );

  useEffect(() => {
    if(!data?.post) return

    setValue('title', data.post.title)
    setValue('content', data.post.content)
    setValue('categories', data.post.postCategories.map((pc) => pc.category))
    setThumbnailImageKey(data.post.thumbnailImageKey);
    
  }, [data,setValue])

  const onSubmit = async(data: PostFormValues) => {
    await fetch(`/api/admin/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        Authorization: token,
      },
      body:JSON.stringify(data),
    })
    alert('記事を更新しました')
  }
  
  const handleDelete = async() => {
    await fetch(`/api/admin/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    })
    alert('記事を削除しました')

    //カテゴリー一覧へ戻る
    router.push('/admin/posts')
  }


  if (!data) { return <p>読み込み中・・・</p>; }
  if (error) { return <p>エラー:{error.message}</p>; }

  return (
    <div className="mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-black text-xl font-bold">記事編集</h2>
      </div>
      <PostForm 
        mode="edit"
        register={register}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        onDelete={handleDelete}
        control={control}
        setValue={setValue}
        thumbnailImageKey={thumbnailImageKey}
        setThumbnailImageKey={setThumbnailImageKey}
      />
    </div>
  );
}

