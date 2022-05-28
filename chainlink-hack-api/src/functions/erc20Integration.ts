import { WalletBalance, TokenBalance, MoralisChainOptions } from '../utils/types';
import moralis from 'moralis/node';
import 'dotenv/config';

// Load moralis SDK
const MORALIS_SERVER_URL: string = process.env.MORALIS_SERVER_URL || "";
const MORALIS_APP_ID: string = process.env.MORALIS_APP_ID || "";
moralis.start({ serverUrl: MORALIS_SERVER_URL, appId: MORALIS_APP_ID });

export const getTokenPrice = async (inputToken: TokenBalance, chain: MoralisChainOptions): Promise<number | null> => {
    // slow down API call rate.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log('Fetching price data for: ' + inputToken.name);
    const price: number | null = await moralis.Web3API.token
      .getTokenPrice({ address: inputToken.token_address, chain: chain })
      .then((token) => token.usdPrice)
      .catch((err) => {
        console.log(err);
        return null;
      });
    return price;
  };

export const getTokenBalances = async (address: string, chain: MoralisChainOptions): Promise<WalletBalance[] | null> => {
    // fetch token balance from address
    const tokens: TokenBalance[] | null = await moralis.Web3API.account
      .getTokenBalances({ address: address, chain: chain })
      .catch((err) => {
        console.log(err);
        return null;
      });
    console.log('Fetched all ERC20 balances for chain: ' + chain);
    
    if (tokens === null || tokens.length === 0)
      return null;

    // create Map() to store token balances, populate with info from API call.
    const tokenBalances: Map<String, WalletBalance> = new Map();
    for (const token of tokens!) {
      const tokenInfo: WalletBalance = {
        logo: token.logo,
        name: token.name,
        symbol: token.symbol,
        balance: parseFloat(token.balance) * Math.pow(10, -1 * token.decimals),
        price: undefined,
        value: undefined,
        token_address: token.token_address,
      };
      tokenBalances.set(token.token_address, tokenInfo);
    }

    // attempt to get price data for each token
    // for (const token of tokens!) {
    //   const price: number | null = await getTokenPrice(token, chain);
    //   try {
    //     const tokenInfo: WalletBalance | undefined = tokenBalances.get(token.token_address);
    //     if (tokenInfo && price) {
    //       tokenInfo!.price = price;
    //       tokenInfo!.value = tokenInfo.price * tokenInfo.balance;
    //       tokenBalances.set(token.token_address, tokenInfo);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    return Array.from(tokenBalances.values());
};

export const getTotalValue = async (address: string, chain: MoralisChainOptions): Promise<number | null> => {
  // fetch token balance from address
  const tokens: TokenBalance[] | null = await moralis.Web3API.account
    .getTokenBalances({ address: address, chain: chain })
    .catch((err) => {
      console.log(err);
      return null;
    });
  console.log('Fetched all ERC20 balances for chain: ' + chain);
  
  if (tokens === null || tokens.length === 0)
    return null;

  // attempt to get price data for each token
  let totalValueUsd: number = 0;
  for (const token of tokens!) {
    const price: number | null = await getTokenPrice(token, chain);
    try {
      if (price) {
        totalValueUsd += (price * parseFloat(token.balance) * Math.pow(10, -1 * token.decimals));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return totalValueUsd;
};

