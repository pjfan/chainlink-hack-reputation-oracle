import { loadingButtonClasses } from '@mui/lab';
import React, { useState, useContext, createContext } from 'react';
import { MoralisChainOptions } from './useMoralisChainOptions';

export type SearchContextType = {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  network: MoralisChainOptions;
  setNetwork: React.Dispatch<React.SetStateAction<MoralisChainOptions>>;
  erc20Result: boolean | undefined;
  setErc20Result: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  nftResult: boolean | undefined;
  setNftResult: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  addressActivityResult: boolean | undefined;
  setAddressActivityResult: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

export const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export const SearchContextProvider: React.FC = ({ children }) => {
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState({} as MoralisChainOptions);

  // Result state:
  // undefined: no query
  // false: loading. result not ready.
  // true: result ready
  const [erc20Result, setErc20Result] = useState<boolean | undefined>(undefined);
  const [nftResult, setNftResult] = useState<boolean | undefined>(undefined);
  const [addressActivityResult, setAddressActivityResult] = useState<boolean | undefined>(
    undefined
  );

  return (
    <SearchContext.Provider
      value={{
        address,
        setAddress,
        network,
        setNetwork,
        erc20Result,
        setErc20Result,
        nftResult,
        setNftResult,
        addressActivityResult,
        setAddressActivityResult,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchContextProvider');
  }

  return context;
};
