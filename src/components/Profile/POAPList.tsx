import { useEffect, useState } from 'react';
import { useMoralisWeb3Api, useMoralis } from 'react-moralis';
import { LoadingProgress } from '../LoadingProgress';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import { useSearchContext } from '@/hooks/useSearch';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { MoralisChainOptions } from '../../hooks/useMoralisChainOptions';

export interface POAPListProps {
  chain: MoralisChainOptions;
  address: string;
}

export const POAPList: React.FC<POAPListProps> = (props: POAPListProps) => {
  const userAddress = props.address;
  const userChain = props.chain;
  const Web3Api = useMoralisWeb3Api();
  const { isInitialized } = useMoralis();
  const [poaps, setPoaps] = useState<any>();
  const [otherNfts, setOtherNfts] = useState<any>();
  const { nftResult, setNftResult } = useSearchContext();

  useEffect(() => {
    if (isInitialized && props.address !== '') {
      (async () => {
        setNftResult(false);
        const res = userAddress
          ? await Web3Api.account.getNFTs({ chain: userChain, address: userAddress })
          : null;
        if (res?.result) {
          const nfts = res.result.map((nft) => ({
            ...nft,
            metadata: nft.metadata ? JSON.parse(nft.metadata) : null,
          }));

          const _poaps = nfts.filter((nft) => nft.metadata?.tags?.includes('poap'));
          const _otherNfts = nfts.filter((nft) => !nft.metadata?.tags?.includes('poap'));
          setPoaps(_poaps);
          setOtherNfts(_otherNfts);
        }

        setNftResult(true);
        // const res = userAddress
        //   ? await Web3Api.account.getNFTs({ chain: userChain, address: userAddress })
        //   : null;
        // if (res?.result) {
        //   const nfts = res.result.map((nft) => ({
        //     ...nft,
        //     metadata: nft.metadata ? JSON.parse(nft.metadata) : null,
        //   }));

        //   const _poaps = nfts.filter((nft) => nft.metadata?.tags?.includes('poap'));
        //   const _otherNfts = nfts.filter((nft) => !nft.metadata?.tags?.includes('poap'));
        //   setPoaps(_poaps);
        //   setOtherNfts(_otherNfts);
        //   setNftResult(true);
        // }
      })();
    }
  }, [userAddress, userChain]);

  const getName = (nft: any) => nft.metadata?.name || nft.name || null;

  const getImageUrl = (nft: any) => {
    let imgUrl = nft.metadata?.image_url || nft.metadata?.image || null;
    // convert ipfs urls to use gateway
    if (imgUrl?.startsWith('ipfs://ipfs/')) {
      imgUrl = imgUrl.replace('ipfs://', 'https://ipfs.io/');
    } else if (imgUrl?.startsWith('ipfs://')) {
      imgUrl = imgUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    return imgUrl;
  };

  const getOpenseaUrl = (nft: any) =>
    `https://opensea.io/assets/${nft.token_address}/${nft.token_id}`;

  const getDescription = (nft: any) => nft.metadata?.description || null;

  return (
    <>
      {nftResult !== undefined &&
        (nftResult == false ? (
          <LoadingProgress />
        ) : (
          <>
            <TableContainer component={Paper}>
              POAPs
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Image URL</TableCell>
                    <TableCell align="left">OpenSea URL</TableCell>
                    <TableCell align="left">Token Address</TableCell>
                    <TableCell align="left">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {poaps?.map((poap: any) => (
                    <TableRow
                      key={poap.token_address}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left">{getName(poap)}</TableCell>
                      <TableCell align="left">
                        <Link href={getImageUrl(poap)}>
                          <Avatar src={getImageUrl(poap)} />
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        <Link href={getOpenseaUrl(poap)}>
                          <Avatar src={getOpenseaUrl(poap)} />
                        </Link>
                      </TableCell>
                      <TableCell align="left">{poap.token_address}</TableCell>
                      <TableCell align="left">{getDescription(poap)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <br />
              Other NFTs
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Image URL</TableCell>
                    <TableCell align="left">OpenSea URL</TableCell>
                    <TableCell align="left">Token Address</TableCell>
                    <TableCell align="left">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {otherNfts?.map((otherNft: any) => (
                    <TableRow
                      key={otherNft.token_address}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left">{getName(otherNft)}</TableCell>
                      <TableCell align="left">
                        <Link href={getImageUrl(otherNft)}>
                          <Avatar src={getImageUrl(otherNft)} />
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        <Link href={getOpenseaUrl(otherNft)}>
                          <Avatar src={getOpenseaUrl(otherNft)} />
                        </Link>
                      </TableCell>
                      <TableCell align="left">{otherNft.token_address}</TableCell>
                      <TableCell align="left">{getDescription(otherNft)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ))}
    </>
  );
};
