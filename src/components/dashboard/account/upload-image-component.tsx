'use client';

import { generateDownload } from '@/lib/utils/cropeImage';
import { Box, Button, Stack } from '@mui/material';
import { CheckFat } from '@phosphor-icons/react/dist/ssr/CheckFat';
import { X } from '@phosphor-icons/react/dist/ssr/X';
import React from 'react';
import Cropper, { Area } from 'react-easy-crop';

type PropsType = {
  text: string
  color?: "error" | "inherit" | "primary" | "secondary" | "success" | "info" | "warning",
  variant?: "text" | "contained" | "outlined",
  fullWidth?: boolean,
}

const UploadImageComponent = ({ text, color = 'primary', variant = 'contained', fullWidth = false }: PropsType) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const triggerFileSelectPopup = () => inputRef.current?.click();

  const [image, setImage] = React.useState<string | null>(null);
  const [croppedArea, setCroppedArea] = React.useState<Area | null>(null);
  const [crop, setCrop] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState<number>(1);

  const onCropComplete = (_croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener('load', () => {
        setImage(reader.result as string);
      });
    }
  };

  const onDownload = () => {
    if (image && croppedArea) {
      generateDownload(image, croppedArea);
      setImage(null)
    }
  };

  return (
    <Box zIndex={1000} sx={{ width: '100%' }}>
      <div>
        {image ? (
          <div>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        ) : null}
      </div>

      <Box>
        <input
          type='file'
          accept='image/*'
          ref={inputRef}
          onChange={onSelectFile}
          style={{ display: 'none' }}
        />
        <Button
          fullWidth={fullWidth}
          style={{ display: image ? 'none' : '' }}
          variant={variant}
          color={color}
          onClick={triggerFileSelectPopup}>
          {text}
        </Button>

        <Box sx={{ display: !image ? 'none' : '' }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '16px',
            position: 'fixed',
            left: '50%',
            bottom: '10%',
            transform: 'translateX(-50%)'
          }}>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={onDownload}
                aria-label="save"
                startIcon={<CheckFat />}
                variant="contained"
                color="success">
                Save
              </Button>
              <Button
                onClick={() => setImage(null)}
                aria-label="close"
                startIcon={<X />}
                variant="contained"
                color="error">
                Cancel
              </Button>
            </Stack>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default UploadImageComponent;