'use client'

import * as React from 'react';
import { Pagination as PaginationMUI } from '@mui/material';
import { useRouter } from 'next/navigation';

interface IProps {
  currentPath: string
  page: number
  totalPages: number
}

export function Pagination({ page, totalPages, currentPath }: IProps): React.JSX.Element {

  const router = useRouter()

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    pageCurrent: number
  ) => {
    router.push(`${currentPath}?page=${pageCurrent}`)
  };

  return (
    <PaginationMUI
      count={totalPages}
      page={page}
      onChange={handleChange}
      size="small" />
  );
}
