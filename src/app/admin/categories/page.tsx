"use client"

import Link from "next/link";
import { Category } from "@/app/_types/Post";
import { useDataFetch } from "@/app/admin/_hooks/useDataFetch";


export default function AdminCategories () {
 
  const { data, error, isLoading } = useDataFetch('/api/admin/categories');
  const categories = data?.categories || [];

  if (isLoading) { return <p>読み込み中・・・</p>; }
  if (error) { return <p>エラー:{error.message}</p>; }
  

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between mb-6">
        <h2 className="text-black text-xl font-bold">カテゴリー一覧</h2>
        <button className="text-white font-bold bg-blue-500 px-4 py-2 rounded-md">
          <Link href={'/admin/categories/new'}>新規作成</Link> 
        </button>
      </div>
      <ul>
      {!isLoading && categories.length === 0 && <p>カテゴリーがありません</p>}
        {categories.map(category =>  {
          return(
            <li key={category.id} className="postList bg-white border-b border-gray-300 hover:bg-gray-300 ">
              <Link href={`/admin/categories/${category.id}`}> 
                <div className="p-4">
                  <h3 className="postTitle text-xl font-bold">{category.name}</h3>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

