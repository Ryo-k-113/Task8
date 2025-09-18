'use client'

import Link from 'next/link'
import React from 'react'

export const Header: React.FC = () => {
  return (
    <header className="font-bold bg-stone-800 p-6 flex justify-between mx-auto items-center">
      <h1 className="logo text-white">
        <Link href="/">Blog</Link>
      </h1>
      <nav>
        <ul className="flex gap-8">
          <li className="text-white">
            <Link href="/contact">お問い合わせ</Link>
          </li>
          <li className="text-white">
            <Link href="/">ログイン</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}