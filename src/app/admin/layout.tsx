'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const isSelected = (href: string) => {
    return pathname.includes(href)
  }

  return (
    <div className='flex'>
      <aside className="w-1/5 h-screen bg-gray-100">
        <ul>
          <li className={`text-base hover:bg-blue-100 ${
            isSelected('/admin/posts') && 'bg-blue-100'
          }`}>
            <Link href="/admin/posts" 
            className="block p-4">
              記事一覧</Link>
          </li>
          <li className={`text-base hover:bg-blue-100 ${
            isSelected('/admin/categories') && 'bg-blue-100'
          }`}>
            <Link href="/admin/categories" 
            className="block p-4">カテゴリー一覧</Link>
          </li>
        </ul>
      </aside>
      <div className="w-4/5">{children}</div>
    </div>
  );
}

