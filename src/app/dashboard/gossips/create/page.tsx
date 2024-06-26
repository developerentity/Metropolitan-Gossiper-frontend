import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { createGossip } from '@/lib/actions/gossips';
import { Box, TextField } from '@mui/material';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';

export default async function CreateGossipPage() {
    return (
        <form action={createGossip}>
            <Card>
                <CardHeader
                    subheader="You are able to share there whatever you want"
                    title="Create Gossip"
                />
                <Divider />
                <CardContent>
                    <Stack spacing={2}>
                        <FormControl>
                            <Box>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<ImageIcon />}
                                >
                                    Upload image
                                    <input type="file" name='gossipCover' style={styles} />
                                </Button>
                            </Box>

                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Title</InputLabel>
                            <OutlinedInput label="Title" name="title" type="text" required />
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Content"
                            name="content"
                            required
                            multiline
                            rows={5}
                            variant="outlined"
                            InputProps={{
                                style: { height: 140 },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    resize: 'none',
                                },
                            }}
                        />
                    </Stack>
                    <CardActions sx={{ justifyContent: 'flex-end', px: 0, mt: 1 }}>
                        <Button type="submit" variant="contained">Share</Button>
                    </CardActions>
                </CardContent>

            </Card>
        </form>
    );
}

const styles: React.CSSProperties = {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
};