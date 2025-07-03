"use client"
import React from 'react'
import { useState } from 'react'

export default function Contact () {
  //入力の状態管理
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // エラー状態管理
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');

  //送信中はユーザーの操作は不可
  const [disable, setDisable] = useState<boolean>(false);
  
  //バリデーション
  const valid = () => {
    let isValid: boolean = true;

    //名前
    if(!name) {
      setNameError('名前は必須です');
      isValid = false;
    } else if (name.length > 30) {
      setNameError('名前は30文字以内で入力してください');
      isValid = false;
    } 

    //メール
    if (!email){
      setEmailError('メールアドレスは必須です');
      isValid = false;
    } else if (!email.match(/.+@.+\..+/)) {
      setEmailError('メールアドレスの形式が正しくありません。')
      isValid = false
    }

    //本文
    if (!message) {
      setMessageError('本文は必須です');
      isValid = false;
    } else if (message.length > 500) {
      setMessageError('本文は500文字以内で入力してください');
      isValid = false;
    } 

    if (!isValid) return;

    return isValid;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  //ページリロードを防ぐ

    if (!valid()) return;
  
    setDisable(true);  //送信中のフォーム操作を不可に

    try {
      await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });
      alert('送信しました。')
      handleClear()  //フォームのクリア

    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("エラー：", e.message);
      } else {
        console.error("エラー：", e);
      }
      alert('送信に失敗しました')

    } finally {
      setDisable(false)  //フォーム操作を可に
    }
  };

  //フォームのクリア 
  const handleClear = (): void => {
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto pt-10">
        <h2 className="text-xl font-bold text-black">問合わせフォーム</h2>
        <form onSubmit={handleSubmit}>
          <dl className="flex justify-between items-center h-[3rem] w-full mt-10">
            <dt className="w-1/5 text-md">
              <label htmlFor="name">
                お名前
              </label>
            </dt>
            <dd className="w-4/5 h-full">
              <input 
                id="name" 
                name="name" 
                type="text" 
                value={name}  
                className="h-full w-full border-1 rounded-md border border-gray-300 p-3"  
                onChange={(e) => setName(e.target.value)} 
                disabled={disable}
                />
              {nameError && <p className="text-red-400 text-sm mt-1">{nameError}</p>}
            </dd>
          </dl>

          <dl className="flex justify-between items-center h-[3rem] w-full mt-10">
            <dt className="w-1/5 text-md">
              <label htmlFor="email">
                メールアドレス
              </label>
            </dt>
            <dd className="w-4/5 h-full">
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={email} 
                className="h-full w-full border-1 rounded-md border border-gray-300 p-3" 
                onChange={(e) => setEmail(e.target.value)}
                disabled={disable}
                />
              {emailError && <p className="text-red-400 text-sm mt-1">{emailError}</p>}
            </dd>
          </dl>

          <dl className="flex justify-between items-center h-auto w-full mt-10">
            <dt className="w-1/5 text-md">
              <label htmlFor="message">
                本文
              </label>
            </dt>
            <dd className="w-4/5 h-full">
              <textarea 
                id="message" 
                name="message" 
                value={message} 
                rows={8}
                className="h-full w-full border-1 rounded-md border border-gray-300 p-3"  
                onChange={(e) => setMessage(e.target.value)}
                disabled={disable} 
              />
              {messageError && <p className="text-red-400 text-sm mt-1">{messageError}</p>}
            </dd>
          </dl>

          <div className="flex justify-center gap-x-6 mt-10">
            <button 
              type="submit" 
              value={message} 
              className="text-white font-bold bg-gray-800 px-4 py-2 rounded-md" 
              disabled={disable}
            >
              ボタン
            </button>
            <button 
              type="button" 
              className="font-bold bg-gray-200 px-4 py-2 rounded-md"  
              onClick={handleClear}
              disabled={disable}
            >
              クリア
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

