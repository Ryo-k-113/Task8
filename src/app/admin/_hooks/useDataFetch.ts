import useSWR from 'swr';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

export const fetcher = async ([url,token]: [string,string]) => {

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token, 
    },
  });

  if (!res.ok) {
    const error = new Error("データの取得中にエラーが発生しました");
    throw error;
  }
  return res.json();
};


export const useDataFetch = (url: string | null) => {
  const { token, isLoading: isSessionLoading } = useSupabaseSession();

   // URLが存在し、トークンがあるかつセッションがロード中でない場合にのみデータをフェッチ
   const shouldFetch = !isSessionLoading && url && token;

  const { data, error, isLoading } = useSWR(
    shouldFetch ? [url,token] : null,
    fetcher
  );
  return {
    data,
    isLoading,
    error
  }
}

