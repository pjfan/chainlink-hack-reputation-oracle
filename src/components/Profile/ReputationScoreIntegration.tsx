import React from "react";
import { useReputationScore, } from "../../hooks/useReputationScore";
import { MoralisChainOptions } from "../../hooks/useMoralisChainOptions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export interface ReputationScoreIntegrationProps {
  address: string;
  chain: MoralisChainOptions;
}

export const ReputationScoreIntegration: React.FC<ReputationScoreIntegrationProps> = (
  props: ReputationScoreIntegrationProps
) => {
  const assets: number | null | undefined = useReputationScore(
    props.address,
    props.chain
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Reputation Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="left">{assets}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};