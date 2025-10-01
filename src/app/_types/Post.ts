
export type Post = {
  id: number;
  title: string;
  content: string;
  thumbnailImageKey: string;
  createdAt: string;
  categories: string[];
  postCategories: { category: Category }[]; 
};

export type Category = {
  id: number;
  name: string;
};

//postのRHFの型定義
export type  PostFormValues = {
  title: string;
  content: string;
  thumbnailImageKey: string;
  categories: Category[];
};