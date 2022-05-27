import React from 'react';
import { useReputationScore } from '../../hooks/useReputationScore';
import { MoralisChainOptions } from '../../hooks/useMoralisChainOptions';
import { LoadingProgress } from '../LoadingProgress';
import { useSearchContext } from '@/hooks/useSearch';
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

export interface ReputationScoreProps {
  address: string;
  chain: MoralisChainOptions;
}

export const ReputationScore: React.FC<ReputationScoreProps> = (props: ReputationScoreProps) => {
  const assets: number | null | undefined = useReputationScore(props.address, props.chain);
  const { addressActivityResult, setAddressActivityResult } = useSearchContext();

  return (
    <>
      {addressActivityResult !== undefined &&
        (addressActivityResult == false ? (
          <LoadingProgress />
        ) : (
          <Box sx={{ display: 'flex', alignItems:'center', justifyContent: 'center', mt: '20px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: '300px' }}>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography align="right" variant="h6">Reputation Score</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography align="left" variant="h6">{assets}</Typography>
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
