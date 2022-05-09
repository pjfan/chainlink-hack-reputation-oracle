import { Box, Grid } from '@mui/material';
import React from 'react';
import { ProfilePicAvator } from './ProfilePicAvatar';
import { updateProfile, getProfile } from '../../hooks/useBasicProfile';

export const Profile: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ProfilePicAvator />
        </Box>
      </Grid>

      <Grid item xs={6} md={4}>
        <Box sx={{ width: 200, height: 200, backgroundColor: 'primary.main' }}>POAP integration</Box>
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
