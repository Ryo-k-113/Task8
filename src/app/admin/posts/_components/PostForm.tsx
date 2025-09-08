'use client'

import { UseFormRegister, UseFormHandleSubmit, FieldErrors, Controller} from "react-hook-form";
import Link from 'next/link'
import { useState } from "react";
import React from 'react'
import { Category, PostFormValues } from '@/app/_types/Post'
import { CategoriesSelect } from "./CategoriesSelect";

type Props = {
  mode: 'new' | 'edit'
  categories: Category[] 
  setCategories: (categories: Category[]) => void
  register: UseFormRegister<PostFormValues>
  handleSubmit: UseFormHandleSubmit<PostFormValues>
  onSubmit:(data: PostFormValues) => void
  isSubmitting: boolean
  onDelete?: () => void
};


export const PostForm: React.FC<Props> = ({ 
  mode,
  categories, 
  setCategories,
  register, 
  handleSubmit, 
  onSubmit,
  isSubmitting,
  onDelete,
}) => {

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              <label htmlFor="thumbnailUrl">
                サムネイルURL
              </label>
            </dt>
            <dd className="h-full">
              <input 
                id="thumbnailUrl" 
                type="text" 
                {...register("thumbnailUrl")}
                className="h-full w-full rounded-md border border-gray-200 p-3" 
                disabled={isSubmitting}
              />
            </dd>
          </dl>
        <dl className="mb-8">
            <dt className="text-base">
              <label htmlFor="categories">
                カテゴリー
              </label>
            </dt>
            <dd className="h-full">
              <CategoriesSelect 
                selectedCategories={categories}
                setSelectedCategories={setCategories}
                register={register}
                isSubmitting={isSubmitting}
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