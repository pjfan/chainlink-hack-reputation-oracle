import React, { useState, useEffect, useContext, useCallback } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import CyberConnect from '@cyberlab/cyberconnect';
import {
  authenticateUserDid,
  getDidProvider,
  initThreeId,
  initCeramic,
} from '../hooks/useDidConnect';
import { IDX } from '@ceramicstudio/idx';
import type { CeramicApi } from '@ceramicnetwork/common';

interface Web3ContextInterface {
  connectWallet: () => Promise<void>;
  address: string;
  ens: string | null;
  idx?: IDX;
  cyberConnect: CyberConnect | null;
}

export const Web3Context = React.createContext<Web3ContextInterface>({
  connectWallet: async () => undefined,
  address: '',
  ens: '',
  idx: undefined,
  cyberConnect: null,
});

export const Web3ContextProvider: React.FC = ({ children }) => {
  const [address, setAddress] = useState<string>('');
  const [ens, setEns] = useState<string | null>('');
  const [idx, setIdx] = useState<IDX>();
  const [cyberConnect, setCyberConnect] = useState<CyberConnect | null>(null);

  async function getEnsByAddress(provider: ethers.providers.Web3Provider, address: string) {
    const ens = await provider.lookupAddress(address);
    return ens;
  }

  const initCyberConnect = useCallback(async (provider: any) => {
    const cyberConnect = new CyberConnect({
      provider,
      namespace: 'CyberConnect',
    });

    setCyberConnect(cyberConnect);
  }, []);

  const connectWallet = React.useCallback(async () => {
    const web3Modal = new Web3Modal({
      network: 'kovan',
      cacheProvider: true,
      providerOptions: {},
    });

    const ethProvider = await web3Modal.connect();
    await ethProvider.enable();

    const web3Provider = new ethers.providers.Web3Provider(ethProvider);
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    const ens = await getEnsByAddress(web3Provider, address);
    await initCeramic();
    await initThreeId();

    setAddress(address);
    setEns(ens);
    await initCyberConnect(web3Provider);

    if (window.threeId !== undefined) {
      const didProvider = await getDidProvider(window.threeId, ethProvider, address);
      if (didProvider) {
        const ceramicApi = window.ceramic;
        if (ceramicApi !== undefined) {
          const did = await authenticateUserDid(didProvider, ceramicApi);
          ceramicApi.did = did;
          setIdx(new IDX({ autopin: true, ceramic: ceramicApi }));
        }
      }
    }
  }, [initCyberConnect]);

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        address,
        ens,
        idx,
        cyberConnect,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const web3 = useContext(Web3Context);
  return web3;
};
