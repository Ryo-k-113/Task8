'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { UseFormRegister, useFormContext, useForm, Controller,control, useWatch } from "react-hook-form";
import { Category, PostFormValues } from '@/app/_types/Post'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { useDataFetch } from "@/app/admin/_hooks/useDataFetch";
import { LiaAmericanSignLanguageInterpretingSolid } from 'react-icons/lia';

type Props = {
  isSubmitting: boolean
  registeredCategories: Category[] 
  onChange: (selectedCategories: Category[]) => void;
};

export const CategoriesSelect: React.FC<Props> = ({
  isSubmitting,
  registeredCategories,
  onChange,
}) => {
 
  const { token } = useSupabaseSession();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  //セレクトボックスに表示するカテゴリー一覧を取得
  const { data } = useDataFetch('/api/admin/categories');
  const categories = data?.categories || [];

  
  useEffect(() => {
    if (!isInitialized && registeredCategories.length > 0) {
      setSelectedCategories(registeredCategories);
      setIsInitialized(true); // 一度だけ初期化を行う
    }
  }, [registeredCategories, isInitialized]);


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
    }

    useEffect(() => {
      if (selectedCategories.length > 0) {
        onChange(selectedCategories);
      }
      console.log(selectedCategories)
    }, [selectedCategories]);


  return (
    <FormControl className="w-full">
      <Select
        multiple
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