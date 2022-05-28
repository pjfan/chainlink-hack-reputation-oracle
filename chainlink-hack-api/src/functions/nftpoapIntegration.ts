import { MoralisChainOptions, NFTMetadata } from '../utils/types';
import moralis from 'moralis/node';
import 'dotenv/config';

// Load moralis SDK
const MORALIS_SERVER_URL: string = process.env.MORALIS_SERVER_URL || "";
const MORALIS_APP_ID: string = process.env.MORALIS_APP_ID || "";
moralis.start({ serverUrl: MORALIS_SERVER_URL, appId: MORALIS_APP_ID });



export const getNFTs = async (address: string, chain: MoralisChainOptions, onlyPoaps: boolean): Promise<NFTMetadata[] | null> => {
    // fetch nfts from address
    const res = await moralis.Web3API.account
      .getNFTs({ address: address, chain: chain })
      .catch((err) => {
        console.log(err);
        return null;
      });
    console.log('Fetched all user NFTs for chain: ' + chain);
    
    if (!res?.result) {
      return null;
    }
    
    const allNftMetadata = res.result.map((nft) => ({
      ...nft,
      metadata: nft.metadata ? JSON.parse(nft.metadata) : null,
    }));

    // filter based on onlyPoaps boolean
    const nftMetadata = allNftMetadata.filter((nft) => {
      if (onlyPoaps) {
        return nft.metadata?.tags?.includes("poap");
      }
      else{
        return !nft.metadata?.tags?.includes("poap");
      }
    })

    const nfts: NFTMetadata[] = nftMetadata.map((nft) => {
      let imgUrl = nft.metadata?.image_url || nft.metadata?.image || null;
      
      // convert ipfs urls to use gateway
      if (imgUrl?.startsWith("ipfs://ipfs/")) {
        imgUrl = imgUrl.replace("ipfs://", "https://ipfs.io/");
      } else if (imgUrl?.startsWith("ipfs://")) {
        imgUrl = imgUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
      }
      
      return {
          "name": nft.metadata?.name || nft.name || null,
          "imageUrl": imgUrl,
          "openSeaUrl": `https://opensea.io/assets/${nft.token_address}/${nft.token_id}`,
          "tokenAddress": nft.token_address,
          "description": nft.metadata?.description || null
      }
    });

    return nfts;
};
