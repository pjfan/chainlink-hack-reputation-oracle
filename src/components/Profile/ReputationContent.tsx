import { Box, Grid } from '@mui/material';
import React from 'react';

export const ReputationContent: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: 'primary.main' }}>ERC20 integration</Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: 'primary.main' }}>Address history length</Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: 'primary.main' }}>Twitter verification</Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: 'primary.main' }}>Github verification</Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: 'primary.main' }}>NFT collections</Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: 'primary.main' }}>POAP integration</Box>
      </Grid>
    </Grid>
  );
};
