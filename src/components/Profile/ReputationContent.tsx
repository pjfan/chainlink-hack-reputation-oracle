import '@fontsource/raleway';

import { AddressHistory } from './AddressHistory';
import { useSearchContext } from '@/hooks/useSearch';
import AllOutRoundedIcon from '@mui/icons-material/AllOutRounded';
import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LoadingProgress } from '../LoadingProgress';
import { ERC20Integration } from './ERC20Integration';
import { Search } from '../Search/Search';
import { FollowList } from '@/components/Follow/FollowList';
import { ReputationScore } from './ReputationScore';
import {POAPList} from './POAPList';

export const ReputationContent: React.FC = () => {
  const { address, network } = useSearchContext();

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={9}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '150px' }}>
            <Stack gap={1}>
              <Stack direction="row" alignItems="center" gap={1}>
                <AllOutRoundedIcon
                  fontSize="large"
                  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                />
                <Typography
                  variant="h1"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'raleway',
                    fontWeight: 700,
                    fontSize: '40px',
                    color: 'primary',
                    textDecoration: 'none',
                  }}
                >
                  ReputationOracle
                </Typography>
              </Stack>
              <Typography
                variant="h2"
                noWrap
                sx={{
                  ml: 15,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'raleway',
                  fontSize: '16px',
                  color: 'primary',
                  textDecoration: 'none',
                }}
              >
                Your gateway to Web3 and Metaverse Reputation
              </Typography>
            </Stack>
          </Box>
          <Search />
        </Box>
      </Grid>{' '}
      {/* End of Search bar */}

      <Grid item xs={6}>
        <ReputationScore address={address} chain={network} />
      </Grid>

      <Grid item xs={6} md={4}>
        <AddressHistory address={address} chain={network} />
      </Grid>


      <Grid item xs={6}>
        <FollowList address={address} network='ETH' />
      </Grid>

      <Grid item xs={12}>
        <POAPList address={address} chain={network} />
      </Grid>

      <Grid item xs={12}>
        <ERC20Integration chain={network} address={address} />
      </Grid>
      {/* <Box>
        ERC20 integration
        <ERC20Integration chain={network} address={address} />
      </Box>
      <Grid item xs={6} md={4}>
        Address history:
        <AddressHistory address={address} chain={network} />
      </Grid> */}
      {/* <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: "primary.main" }}>
          Twitter verification
        </Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: "primary.main" }}>
          Github verification
        </Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: "primary.main" }}>
          NFT collections
        </Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: "primary.main" }}>
          POAP integration
        </Box>
      </Grid> */}
    </Grid>
  );
};
