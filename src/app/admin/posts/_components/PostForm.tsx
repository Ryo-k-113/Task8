'use client'

import { UseFormRegister, UseFormHandleSubmit,UseFormSetValue, Controller, Control} from "react-hook-form";
import Link from 'next/link'
import { useState, useEffect} from "react";
import React from 'react'
import { Category, PostFormValues } from '@/app/_types/Post'
import { CategoriesSelect } from "./CategoriesSelect";
import { supabase } from '@/utils/supabase'
import { v4 as uuidv4 } from 'uuid'  // 固有IDを生成するライブラリ
import Image from "next/image";

type PostFormProps = {
  mode: 'new' | 'edit'
  register: UseFormRegister<PostFormValues>
  handleSubmit: UseFormHandleSubmit<PostFormValues>
  setValue: UseFormSetValue<PostFormValues>
  onSubmit:(data: PostFormValues) => void
  isSubmitting: boolean
  onDelete?: () => void
  control: Control<PostFormValues>
  thumbnailImageKey: string
  setThumbnailImageKey: (thumbnailImageKey: string) => void
};


export const PostForm: React.FC<PostFormProps> = ({ 
  mode,
  register, 
  setValue,
  handleSubmit, 
  onSubmit,
  isSubmitting,
  onDelete,
  control,
  thumbnailImageKey,
  setThumbnailImageKey,

}) => {
 
  // Imageタグのsrcにセットする画像URLを持たせるstate
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(
    null,
  )

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length == 0) {
      // 画像が選択されていないのでreturn
      return
    }

    const file = event.target.files[0] // 選択された画像を取得

    const filePath = `private/${uuidv4()}` // ファイルパスを指定

    // Supabaseに画像をアップロード
    const { data, error } = await supabase.storage
      .from('post_thumbnail') // ここでバケット名を指定
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    // アップロードに失敗したらエラーを表示して終了
    if (error) {
      alert(error.message)
      console.error("アップロードエラー:", error.message);
      return
    }
    // data.pathに、画像固有のkeyが入っているので、thumbnailImageKeyに格納する
    setThumbnailImageKey(data.path) 
  }


  useEffect(() => {
    if (!thumbnailImageKey) return

    // アップロード時に取得した、thumbnailImageKeyを用いて画像のURLを取得
    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from('post_thumbnail')
        .getPublicUrl(thumbnailImageKey)

      setThumbnailImageUrl(publicUrl)
    }
    fetcher()
  }, [thumbnailImageKey])

  const handleFormSubmit = async (data: PostFormValues) => {
    // thumbnailImageKeyを含めてデータを送信
    const postData = {
      title: data.title,
      content: data.content,
      thumbnailImageKey, // ここにアップロードした画像のキーを追加
      categories: data.categories,
    };

    // onSubmitを呼び出す
    await onSubmit(postData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
        <dl className="mb-4">
            <dt className="text-base mb-2">
              <label htmlFor="title">
                タイトル
              </label>
            </dt>
            <dd className="h-full">
              <input 
                id="title" 
                type="text"
                {...register("title")}
                className="h-full w-full rounded-md border border-gray-200 p-4" 
                disabled={isSubmitting}
              />
            </dd>
        </dl>
        <dl className="mb-4">
            <dt className="text-base">
              <label htmlFor="content">
                内容
              </label>
            </dt>
            <dd className="h-full">
              <textarea 
                id="content"  
                rows={2}  
                {...register("content")}
                className="h-full w-full rounded-md border border-gray-200 p-3"  
                disabled={isSubmitting} 
              />
            </dd>
          </dl>
        <dl className="mb-4">
            <dt className="text-base">
              <label htmlFor="thumbnailImageKey">
                サムネイルURL
              </label>
            </dt>
            <dd className="h-full">
              <input 
                type="file" 
                id="thumbnailImageKey" 
                accept="image/*"
                {...register("thumbnailImageKey")}
                onChange={handleImageChange}
                className="h-full w-full rounded-md border border-gray-200 p-3" 
                disabled={isSubmitting}
              />
              {thumbnailImageUrl && (
                <div className="mt-2">
                <Image
                  src={thumbnailImageUrl}
                  alt="thumbnail"
                  width={400}
                  height={400}
                  />
                </div>
              )}
            </dd>
          </dl>
        <dl className="mb-8">
            <dt className="text-base">
              <label htmlFor="categories">
                カテゴリー
              </label>
            </dt>
            <dd className="h-full">
              <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                  <CategoriesSelect    
                    registeredCategories={field.value} // 選択されたカテゴリー
                    isSubmitting={isSubmitting} 
                    onChange={field.onChange}
                  />
                )}
              />
              
            </dd>
          </dl>
          <button 
            type="submit" 
            className="text-white bg-indigo-500 px-4 py-2 mr-4 rounded-md"
          >
            { mode === 'new' ? '作成' : '更新' }
          </button>
          { mode === 'edit' && (
            <button
              type="button"
              className="text-white bg-red-500 px-4 py-2 rounded-md"
              onClick={onDelete}
            >
              削除
            </button>
          )}
      </form>
  );
}