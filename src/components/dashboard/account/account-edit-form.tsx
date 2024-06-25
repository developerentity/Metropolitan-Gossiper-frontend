'use client';

import { generateDownload } from '@/lib/utils/cropeImage';
import { CheckFat } from '@phosphor-icons/react/dist/ssr/CheckFat';
import { X } from '@phosphor-icons/react/dist/ssr/X';
import { Box, Button, IconButton, Slider } from '@mui/material';
import React from 'react';
import Cropper, { Area } from 'react-easy-crop';

const AccountEditForm: React.FC = () => {
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
    <Box zIndex={1000}>
      <div>
        {image ? (
          <>
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

            <div className='slider'>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, newValue) => setZoom(newValue as number)}
              />
            </div>
          </>
        ) : null}
      </div>

      <div>
        <input
          type='file'
          accept='image/*'
          ref={inputRef}
          onChange={onSelectFile}
          style={{ display: 'none' }}
        />
        <Button
          style={{ display: image ? 'none' : '' }}
          variant='contained'
          color='primary'
          onClick={triggerFileSelectPopup}
        >
          Choose
        </Button>

        <Box gap={2} sx={{ display: !image ? 'none' : '' }}>
          <IconButton onClick={onDownload} aria-label="save" size="large" color='success'>
            <CheckFat />
          </IconButton>
          <IconButton onClick={() => setImage(null)} aria-label="close" size="large" color='error'>
            <X />
          </IconButton>
        </Box>

      </div>
    </Box>
  );
};

export default AccountEditForm;