"use client"

import { useForm, SubmitHandler, FieldValues, UseFormRegister, UseFormHandleSubmit, UseFormState  } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { Category } from "@/app/_types/Post";
import { CategoryForm } from '@/app/admin/categories/_components/CategoryForm';
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function AdminNewCategory () {
  const router = useRouter();
  const { token } = useSupabaseSession();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Category>();

  
  const onSubmit = async(data: Category) => {

    const res = await fetch('/api/admin/categories',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        Authorization: token,
      },
      body:JSON.stringify(data),
    })

    alert('カテゴリーを作成しました')

    //カテゴリーIDの取得
    const { id } = await res.json()

    //カテゴリーの詳細ページへ遷移
    router.push(`/admin/categories/${id}`)
  }
  

  return (
    <div className="mx-auto p-6">
        <h2 className="text-black text-xl font-bold mb-8">カテゴリー作成</h2>
      <CategoryForm 
        mode="new"
        register={register}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
