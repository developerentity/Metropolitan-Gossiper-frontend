import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import { editGossipAction } from '@/lib/actions/gossips';
import gossips from '@/lib/requests/gossips';
import { Metadata } from 'next';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import { Box, TextField } from '@mui/material';

type Params = {
    params: {
        gossipId: string;
    }
}

export async function generateMetadata({ params: { gossipId } }: Params): Promise<Metadata> {
    const gossipsData: Promise<IGossip> = gossips.readOne(gossipId)
    const gossip = await gossipsData

    return {
        title: `Edit | ${gossip.title} | Gossips | Dashboard`,
        description: `This is the edit page of ${gossip.title} gossip.`,
    }
}

export default async function EditGossipPage({ params: { gossipId } }: Params) {

    const gossipsData: Promise<IGossip> = gossips.readOne(gossipId)
    const gossip = await gossipsData

    const editGossipActionWithId = editGossipAction.bind(null, gossip.id)

    return (
        <form action={editGossipActionWithId}>
            <Card>
                <CardHeader
                    subheader={"Edit gossip"}
                    title={gossip.title}
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
                        <TextField
                            fullWidth
                            label="Content"
                            name="content"
                            defaultValue={gossip.content}
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
                        <Button type="submit" variant="contained">Save</Button>
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