'use client'

import * as React from 'react';
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function SortOrderSelect() {

    const { replace } = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentOrder = searchParams.get('sortOrder') || '';

    const createPageURL = (sortValue: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.set('sortOrder', sortValue.toString());
        return `${pathname}?${params.toString()}`;
    };

    const handleChange = (e: SelectChangeEvent) => {
        replace(createPageURL(e.target.value))
    };

    return (
        <FormControl sx={{ minWidth: 80 }}>
            <Select
                value={currentOrder}
                onChange={(handleChange)}
                displayEmpty
                inputProps={{ 'aria-label': 'Sort order' }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={'asc'}>Asc</MenuItem>
                <MenuItem value={'desc'}>Desc</MenuItem>
            </Select>
        </FormControl>
    )
}