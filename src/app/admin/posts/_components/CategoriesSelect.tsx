'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { UseFormRegister } from "react-hook-form";
import { Category, PostFormValues } from '@/app/_types/Post'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

interface Props {
  selectedCategories: Category[]
  setSelectedCategories: (categories: Category[]) => void
  register: UseFormRegister<PostFormValues>
  isSubmitting: boolean
}

export const CategoriesSelect: React.FC<Props> = ({
  selectedCategories,
  setSelectedCategories,
  register,
  isSubmitting,
}) => {
  const [categories, setCategories] = React.useState<Category[]>([])
    
    //セレクトボックスの選択に変更があったとき、選択されたカテゴリーを配列に追加
    const handleChange = (value: number[]) => {
      value.forEach((v: number) => {
        const isSelect = selectedCategories.some((c) => c.id === v)
        if (isSelect) {
          setSelectedCategories(selectedCategories.filter((c) => c.id !== v))
          return
        }
        
        const category = categories.find((c) => c.id === v)
        if (!category) return
        setSelectedCategories([...selectedCategories, category])
      })
      console.log(selectedCategories)
    }
   
  //セレクトボックスに表示するカテゴリー一覧を取得
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/admin/categories')
      const { categories } = await res.json()
      setCategories(categories)
    }
    fetcher()
  }, [])

  

  return (
    <FormControl className="w-full">
      <Select
        multiple
        {...register("categories")}
        value={selectedCategories}
        disabled={isSubmitting}
        onChange={(e) => handleChange((e.target.value as unknown) as number[])}
        input={<OutlinedInput />}
        renderValue={(selected: Category[]) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value: Category) => (
              <Chip key={value.id} label={value.name} />
            ))}
          </Box>
        )}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}