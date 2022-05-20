import { Box, Grid } from '@mui/material';
import React from 'react';
import { ERC20Integration } from './ERC20Integration';
import { useWeb3 } from '@/context/web3Context';

export const ReputationContent: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4}>
        <Box sx={{ backgroundColor: 'primary.main' }}>
          ERC20 integration<ERC20Integration chain="kovan" address="0xf03E58D404e74E5A8480f033e13ADC4aEAA89873"></ERC20Integration>
        </Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: 'primary.main' }}>
          Address history length
        </Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: 'primary.main' }}>
          Twitter verification
        </Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: 'primary.main' }}>
          Github verification
        </Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: 'primary.main' }}>NFT collections</Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: 'primary.main' }}>
          POAP integration
        </Box>
      </Grid>
    </Grid>
  );
};
