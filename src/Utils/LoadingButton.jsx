import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * @param {{
 *   loading: boolean,
 *   children: React.ReactNode,
 *   type?: "button" | "submit" | "reset",
 *   onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
 *   sx?: object
 * }} props
 */
export default function MyLoadingButton({ loading, children, type = "button", onClick, sx, loadingPosition, loadingIndicator, ...props }) {
  return (
    <Box sx={{ width: '100%', '& > button': { width: '100%' } }}>
      <LoadingButton
        type={type}
        onClick={onClick}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition={loadingPosition}
        loadingIndicator={loadingIndicator}
        variant="contained"
        sx={{
          background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
          color: '#fff',
          fontWeight: 600,
          fontSize: '1.1rem',
          py: "12px",
          borderRadius: '9999px',
          boxShadow: 3,
          textTransform: 'none',
          transition: '0.3s',
          '&:hover': {
            background: 'linear-gradient(90deg, #1e40af 0%, #6d28d9 100%)',
            boxShadow: 6,
          },
          ...sx,
        }}
        {...props}
      >
        {children}
      </LoadingButton>
    </Box>
  );
}

export function SaveButton({ loading, children, ...props }) {
  return (
    <Box sx={{ width: 'auto', display: 'inline-block' }}>
      <LoadingButton
        loading={loading}
        loadingIndicator={<CircularProgress color="inherit" size={20} sx={{ color: '#fff' }} />}
        variant="contained"
        sx={{
          minWidth: 120,
          px: 2.5,
          py: 1.2,
          borderRadius: '16px',
          fontWeight: 600,
          fontSize: '1rem',
          background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
          color: '#fff',
          boxShadow: 3,
          textTransform: 'none',
          transition: '0.3s',
          '&:hover': {
            background: 'linear-gradient(90deg, #1e40af 0%, #6d28d9 100%)',
            boxShadow: 6,
          },
        }}
        {...props}
      >
        {children}
      </LoadingButton>
    </Box>
  );
}
