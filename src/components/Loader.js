import { Stack, useTheme } from '@mui/material';
import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function Loader({ width = 35, visible = true }) {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RotatingLines
        strokeColor={"#11D6D6"}
        strokeWidth="5"
        animationDuration="0.75"
        width={width}
        visible={visible}
      />
    </Stack>
  );
}
