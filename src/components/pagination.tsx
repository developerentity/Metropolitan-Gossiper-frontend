'use client'

import * as React from 'react';
import { Pagination as PaginationMUI } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }): React.JSX.Element {

  const router = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    pageCurrent: number
  ) => {
    router.push(createPageURL(pageCurrent))
  };

  return (
    <PaginationMUI
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      size="small" />
  );
}
