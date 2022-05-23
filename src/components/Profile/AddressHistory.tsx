import React from 'react';
import { Box, Typography } from '@mui/material';
import { useActivity, ActivityInfo } from '../../hooks/useActivity';
import { MoralisChainOptions } from '../../hooks/useMoralisChainOptions';

export interface AddressHistoryProps {
  address: string;
  chain: MoralisChainOptions;
}

export const AddressHistory: React.FC<AddressHistoryProps> = (props: AddressHistoryProps) => {
  const activityInfo: ActivityInfo | undefined = useActivity(props.address, props.chain);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>txnPerMonth: {activityInfo?.transactionsPerMonth}</Typography>
      <Typography>activeBuyerSeller: {activityInfo?.activeBuyerSeller?.toString()}</Typography>
      <Typography>monthsSinceFirstTxn: {activityInfo?.monthsSinceFirstTransaction}</Typography>
      <Typography>existedLongEnough: {activityInfo?.existedLongEnough?.toString()}</Typography>
      <Typography>userIsActive: {activityInfo?.userIsActive?.toString()}</Typography>
    </Box>
  );
};
