'use client'

import * as React from 'react';
import { TablePagination as TablePaginationMUI } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PropsType = {
    count: number,
    limit: number,
    page: number
}

export function TablePagination({ count, limit, page }: PropsType): React.JSX.Element {

    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();


    const handlePageChange = (
        _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        page: number
    ) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', (page + 1).toString());
        router.push(`${pathname}?${params.toString()}`)
    };


    const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.set('limit', event.target.value.toString());
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <TablePaginationMUI
            component="div"
            count={count}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page - 1}
            rowsPerPage={limit}
            rowsPerPageOptions={[2, 3, 6]}
        />
    );
}
