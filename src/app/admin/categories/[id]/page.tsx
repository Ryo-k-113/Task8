"use client"

import { useState, useEffect } from 'react'
import { useForm, SubmitHandler, FieldValues, UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { Category } from "@/app/_types/Post";
import { CategoryForm } from '@/app/admin/categories/_components/CategoryForm';
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function AdminCategory () {
  
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const router = useRouter();
  const { token } = useSupabaseSession();

  const {
      register,
      handleSubmit,
      setValue,
      formState: { isSubmitting },
    } = useForm<Category>();

  const onSubmit = async(data: Category) => {
    await fetch(`/api/admin/categories/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        Authorization: token,
      },
      body:JSON.stringify(data),
    })
    alert('カテゴリーを更新しました')
  }
  
  const handleDelete = async() => {
    await fetch(`/api/admin/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    })
    alert('カテゴリーを削除しました')

    //カテゴリー一覧へ戻る
    router.push('/admin/categories')
  }

  useEffect(() => {
    if(!token) return;

    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories/${id}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })

      const {category} = await res.json()
      setValue('name', category.name)
      setLoading(false)
    }
    fetcher()
  }, [id,token])
 
  // if(loading){
  //   return <div>読み込み中...</div>;
  // } 

  return (
    <div className="mx-auto p-6">
      <h2 className="text-black text-xl font-bold mb-8">カテゴリー編集</h2>
      <CategoryForm 
        mode="edit"
        register={register}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </div>
  );
}
