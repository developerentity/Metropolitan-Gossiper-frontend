import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Heart } from '@phosphor-icons/react/dist/ssr/Heart';
import dayjs from 'dayjs';
import { CardMedia } from '@mui/material';

export interface GossipCardProps {
  gossip: IGossip;
}


export function GossipCard({ gossip }: GossipCardProps): React.JSX.Element {

  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image={gossip.imageUrl || '/assets/no-image.svg'}
        title="Gossip image"
        component='img'
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {gossip.title}
        </Typography>
        <Typography gutterBottom style={{
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
          {gossip.content}
        </Typography>
      </CardContent>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
          <ClockIcon fontSize="var(--icon-fontSize-sm)" />
          <Typography color="text.secondary" display="inline" variant="body2">
            Created {dayjs(gossip.createdAt).format('MMM D, YYYY')}
          </Typography>
        </Stack>
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
          <Heart fontSize="var(--icon-fontSize-sm)" />
          <Typography color="text.secondary" display="inline" variant="body2">
            {gossip.likes.length} likes
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
