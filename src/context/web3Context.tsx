import React, { useState, useEffect, useContext, useCallback } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import CyberConnect from "@cyberlab/cyberconnect";
import {
  authenticateUserDid,
  getDidProvider,
  initThreeId,
} from "../hooks/useDidConnect";
import { IDX } from "@ceramicstudio/idx";
import type { CeramicApi } from "@ceramicnetwork/common";

interface Web3ContextInterface {
  connectWallet: () => Promise<void>;
  address: string;
  ens: string | null;
  idx?: IDX;
  cyberConnect: CyberConnect | null;
}

export const Web3Context = React.createContext<Web3ContextInterface>({
  connectWallet: async () => undefined,
  address: "",
  ens: "",
  idx: undefined,
  cyberConnect: null,
});

export const Web3ContextProvider: React.FC = ({ children }) => {
  const [address, setAddress] = useState<string>("");
  const [ens, setEns] = useState<string | null>("");
  const [idx, setIdx] = useState<IDX>();
  const [cyberConnect, setCyberConnect] = useState<CyberConnect | null>(null);

  async function getEnsByAddress(
    provider: ethers.providers.Web3Provider,
    address: string
  ) {
    const ens = await provider.lookupAddress(address);
    return ens;
  }

  const initCyberConnect = useCallback(async (provider: any) => {
    const cyberConnect = new CyberConnect({
      provider,
      namespace: 'CyberConnect',
    });

    // cyberConnect?.setupDid();
    await cyberConnect.authenticate();
    setCyberConnect(cyberConnect);
  }, []);

  const connectWallet = React.useCallback(async () => {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions: {},
    });

    const instance = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const ens = await getEnsByAddress(provider, address);
    // await initThreeId();

    setAddress(address);
    setEns(ens);
    await initCyberConnect(provider);
    //await cyberConnect?.authenticate();
    debugger;
    // if (window.threeId !== undefined) {
    //   const didProvider = await getDidProvider(
    //     window.threeId,
    //     instance,
    //     address
    //   );
    //   if (didProvider) {
    //     const ceramicApi = cyberConnect?.ceramicClient as CeramicApi;
    //     const did = await authenticateUserDid(didProvider, ceramicApi);
    //     setIdx(new IDX({ autopin: true, ceramic: ceramicApi }));
    //   }
    // }
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
