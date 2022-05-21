import React, { useState, useContext, createContext } from 'react';
import { MoralisChainOptions } from './useMoralisChainOptions';

export type SearchContextType = {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  network: MoralisChainOptions;
  setNetwork: React.Dispatch<React.SetStateAction<MoralisChainOptions>>;
};

export const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export const SearchContextProvider: React.FC = ({children}) => {
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState({} as MoralisChainOptions);

  return (
    <SearchContext.Provider
      value={{
        address,
        setAddress,
        network,
        setNetwork
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
