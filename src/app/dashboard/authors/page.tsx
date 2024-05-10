import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { config } from '@/config';
import { AuthorsFilters } from '@/components/dashboard/author/authors-filters';
import { AuthorsTable } from '@/components/dashboard/author/authors-table';
import authors from '@/lib/requests/authors';
import { ItemsListViewModel } from '@/types/response';

export const metadata = { title: `Authors | Dashboard | ${config.site.name}` } satisfies Metadata;

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 2
  const query = typeof searchParams.query === 'string' ? searchParams.query : undefined
  const sortField = typeof searchParams.sortField === 'string' ? searchParams.sortField : undefined
  const sortOrder = typeof searchParams.sortOrder === 'string' ? searchParams.sortOrder : undefined

  const authorsData: Promise<ItemsListViewModel<AuthorType>> = authors.read({
    pageNumber: page,
    pageSize: limit,
    searchQuery: query,
    sortField,
    sortOrder,
  })
  const { items, totalPages, totalItems } = await authorsData

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Authors</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <AuthorsFilters />
      <AuthorsTable
        count={totalItems}
        page={page}
        rows={items}
        rowsPerPage={limit}
      />
    </Stack>
  );
}