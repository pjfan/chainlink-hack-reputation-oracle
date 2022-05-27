import React from 'react';
import { useSearchContext } from '@/hooks/useSearch';
import { useActivity, ActivityInfo } from '../../hooks/useActivity';
import { MoralisChainOptions } from '../../hooks/useMoralisChainOptions';
import { LoadingProgress } from '../LoadingProgress';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export interface AddressHistoryProps {
  address: string;
  chain: MoralisChainOptions;
}

export const AddressHistory: React.FC<AddressHistoryProps> = (props: AddressHistoryProps) => {
  const { addressActivityResult, setAddressActivityResult } = useSearchContext();
  const activityInfo: ActivityInfo | undefined = useActivity(props.address, props.chain);

  return (
    <>
      {addressActivityResult !== undefined &&
        (addressActivityResult == false ? (
          <LoadingProgress />
        ) : (
          <Box sx={{mt: '20px'}}>
            <Typography variant="h6"> Address Activity Summary </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }}>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      Transactions Per Month
                    </TableCell>
                    <TableCell align="left">{activityInfo?.transactionsPerMonth}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      Months Since First Txn
                    </TableCell>
                    <TableCell align="left">{activityInfo?.monthsSinceFirstTransaction}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      Existed Long Enough:
                    </TableCell>
                    <TableCell align="left">
                      {activityInfo?.existedLongEnough?.toString()}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      User Is Active
                    </TableCell>
                    <TableCell align="left">{activityInfo?.userIsActive?.toString()}</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      Active Buyer/Seller
                    </TableCell>
                    <TableCell align="left">
                      {activityInfo?.activeBuyerSeller?.toString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
    </>
  );
};
