import * as React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { config } from '@/config';
import { GossipsCard } from '@/components/dashboard/gossips/gossips-card';
import { Filter } from '@/components/filter';
import getAllGossips from '@/lib/gossips/getAllGossips';
import { Pagination } from '@/components/pagination';
import { SortOrderSelect } from '@/components/sort-order-select';
import { Card } from '@mui/material';
import Link from 'next/link';

export const metadata = { title: `Gossips | Dashboard | ${config.site.name}` } satisfies Metadata;

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 6
  const query = typeof searchParams.query === 'string' ? searchParams.query : undefined
  const sortOrder = typeof searchParams.sortOrder === 'string' ? searchParams.sortOrder : undefined

  const gossipsData: Promise<GossipsListType> = getAllGossips({
    pageNumber: page,
    pageSize: limit,
    titleFilter: query,
    sortOrder,
  })
  const { items, totalPages } = await gossipsData

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Gossips</Typography>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
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
      <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Filter />
        <SortOrderSelect />
      </Card>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid key={item.id} lg={4} md={6} xs={12}>
            <Link href={`/dashboard/gossips/${item.id}`} style={{ textDecoration: 'none' }}>
              <GossipsCard gossip={item} />
            </Link>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination totalPages={totalPages} />
      </Box>
    </Stack>
  );
}
