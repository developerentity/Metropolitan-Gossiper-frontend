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

export default async function UpdatePasswordForm() {
    return (
        <form action={createGossip}>
            <Card>
                <CardHeader
                    subheader="You are able to share there whatever you want"
                    title="Create Gossip"
                />
                <Divider />
                <CardContent>
                    <Stack spacing={3}>
                        <FormControl fullWidth>
                            <InputLabel>Title</InputLabel>
                            <OutlinedInput label="Title" name="title" type="text" required />
                            <input type='file' name='gossipCover' />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Content</InputLabel>
                            <OutlinedInput label="Content" name="content" type="text" required />
                        </FormControl>
                    </Stack>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button type="submit" variant="contained">Share</Button>
                </CardActions>
            </Card>
        </form>
    );
}
