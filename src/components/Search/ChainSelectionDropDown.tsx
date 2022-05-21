import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '@/context/web3Context';
import { useSearchContext } from 'src/hooks/useSearch';
import { MoralisChainOptions } from '@/hooks/useMoralisChainOptions';
import Moralis from 'moralis/types';

export const ChainSelectionDropDown: React.FC = () => {
  const { network, setNetwork } = useSearchContext();

  return (
    <FormControl>
      <InputLabel>Network</InputLabel>
      <Select
        sx={{ width: '200px' }}
        value={network}
        label="Network"
        onChange={(e) => {
          setNetwork(e.target.value as MoralisChainOptions);
        }}
      >
        <MenuItem value={'eth' as MoralisChainOptions}>Eth Mainnet</MenuItem>
        <MenuItem value={'kovan' as MoralisChainOptions}>Eth Kovan</MenuItem>
        <MenuItem value={'avalanche' as MoralisChainOptions}>Avalanche Mainnet</MenuItem>
        <MenuItem value={'avalanche testnet' as MoralisChainOptions}>Avalanche Fuji</MenuItem>
        <MenuItem value={'polygon' as MoralisChainOptions}>Polygon Mainnet</MenuItem>
        <MenuItem value={'mumbai' as MoralisChainOptions}>Polygon Mumbai</MenuItem>
        <MenuItem value={'fantom' as MoralisChainOptions}>Fantom</MenuItem>
      </Select>
    </FormControl>
  );
};
