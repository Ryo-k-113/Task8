"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { useForm, Controller, SubmitHandler, FieldValues, UseFormRegister, UseFormHandleSubmit, UseFormState  } from 'react-hook-form';
import { Post, PostFormValues, Category } from "@/app/_types/Post";
import { PostForm } from '@/app/admin/posts/_components/PostForm'
import AdminCategories from '../../categories/page';

export default function AdminPost () {

  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const router = useRouter();

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
      thumbnailUrl:"",
      categories:[],
    },
  });

  const onSubmit = async(data: PostFormValues) => {
    await fetch(`/api/admin/posts/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data),
    })
    console.log(data)
    alert('記事を更新しました')
  }
  
  const handleDelete = async() => {
    await fetch(`/api/admin/posts/${id}`, {
      method: 'DELETE',
    })
    alert('記事を削除しました')

    //カテゴリー一覧へ戻る
    router.push('/admin/posts')
  }

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/posts/${id}`)
      const { post }: { post: Post } = await res.json()
      setValue('title', post.title)
      setValue('content', post.content)
      setValue('thumbnailUrl', post.thumbnailUrl)
      setValue('categories', post.postCategories.map((pc) => pc.category))
      setLoading(false)
    }
    fetcher() 
  }, [id])

  if(loading){
    return <div>読み込み中...</div>;
  } 

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
      />
    </div>
  );
}

