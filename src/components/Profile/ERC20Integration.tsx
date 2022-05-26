import React from "react";
import { useWalletBalance, WalletBalance } from "../../hooks/useWalletBalance";
import { MoralisChainOptions } from "../../hooks/useMoralisChainOptions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export interface ERC20IntegrationProps {
  address: string;
  chain: MoralisChainOptions;
}

export const ERC20Integration: React.FC<ERC20IntegrationProps> = (
  props: ERC20IntegrationProps
) => {
  const assets: WalletBalance[] | null | undefined = useWalletBalance(
    props.address,
    props.chain
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Symbol</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Balance</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Value</TableCell>
            <TableCell align="left">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets?.map((row: WalletBalance) => (
            <TableRow
              key={row.token_address}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                <img
                  src={
                    row.logo ||
                    "https://etherscan.io/images/main/empty-token.png"
                  }
                  alt="nologo"
                  width="28px"
                  height="28px"
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.symbol}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.balance}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{row.value}</TableCell>
              <TableCell align="left">{row.token_address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
