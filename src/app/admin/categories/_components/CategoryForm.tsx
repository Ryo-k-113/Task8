import { useForm, UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import { Category } from "@/app/_types/Post";

type CategoryFormProps = {
  mode: 'new' | 'edit'
  register: UseFormRegister<Category>
  handleSubmit: UseFormHandleSubmit<Category>
  onSubmit: (data: Category) => void
  isSubmitting: boolean
  onDelete?: () => void
}

export const CategoryForm: React.FC<CategoryFormProps>  = ({
  mode,
  register,
  handleSubmit,
  onSubmit,
  isSubmitting,
  onDelete,

}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="title">カテゴリー名</label>
        <input 
          id='title'
          type='text'
          {...register('name')}
          disabled={isSubmitting}
          className="block w-full border border-gray-200 rounded-md px-4 py-3"
        />
      </div>
      <button 
        type="submit"
        className="text-sm text-white rounded-md px-4 py-2 mr-2 bg-indigo-600 hover:bg-indigo-700"
      >
        { mode === 'new'? '作成': '更新' }
      </button>
      { mode === 'edit' && 
        <button 
          type='button'
          className="text-sm text-white rounded-md px-4 py-2 bg-red-600 hover:bg-red-700"
          onClick={onDelete}
        >
          削除
        </button>
      }
    </form>
  )
}