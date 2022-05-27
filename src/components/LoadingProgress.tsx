import { Box, CircularProgress } from '@mui/material';

export const LoadingProgress = () => {
  return (
    <Box display="flex" justifyContent="center" sx={{mt: '10px'}}>
      <CircularProgress />
    </Box>
  );
};
