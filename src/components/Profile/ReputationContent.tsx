import { Box, Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { ERC20Integration } from './ERC20Integration';
import { AddressHistory } from './AddressHistory';
import { useWeb3 } from '@/context/web3Context';
import { Search } from '../Search/Search';
import { useSearchContext } from '@/hooks/useSearch';

export const ReputationContent: React.FC = () => {
  const { address, network } = useSearchContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Search />
          <Box>
            ERC20 integration
            <ERC20Integration chain={network} address={address} />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={6} md={4}>
          Address history:
          <AddressHistory address={address} chain={network} />
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
