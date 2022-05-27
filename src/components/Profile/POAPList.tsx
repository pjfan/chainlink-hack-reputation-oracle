import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import Link from '@mui/material/Link';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MoralisChainOptions } from "../../hooks/useMoralisChainOptions";
// import { NftListItem } from "../NftListItem";
// import { NftModal } from "../NftModal";
// import styles from "./index.module.css";

export interface POAPListProps {
    chain: MoralisChainOptions;
    address: string;
}
  
export const POAPList: React.FC<POAPListProps> = (props: POAPListProps) => {
    const userAddress = props.address;
    const userChain = props.chain;
    const Web3Api = useMoralisWeb3Api();
    const [poaps, setPoaps] = useState<any>();
    const [otherNfts, setOtherNfts] = useState<any>();

    useEffect(() => {
        (async () => {
            // setIsLoading(true);
            const res = userAddress ? await Web3Api.account.getNFTs({ chain: userChain, address: userAddress }) : null;
            if (res?.result) {
              const nfts = res.result.map((nft) => ({
                  ...nft,
                  metadata: nft.metadata ? JSON.parse(nft.metadata) : null,
              }));

              const _poaps = nfts.filter((nft) =>
                  nft.metadata?.tags?.includes("poap")
              );
              const _otherNfts = nfts.filter(
                  (nft) => !nft.metadata?.tags?.includes("poap")
              );
              setPoaps(_poaps);
              setOtherNfts(_otherNfts);

              // setIsLoading(false);
            }
        })();
    }, [userAddress, userChain]);

    const getName = (nft: any) => nft.metadata?.name || nft.name || null;

    const getImageUrl = (nft: any) => {
        let imgUrl = nft.metadata?.image_url || nft.metadata?.image || null;
        // convert ipfs urls to use gateway
        if (imgUrl?.startsWith("ipfs://ipfs/")) {
            imgUrl = imgUrl.replace("ipfs://", "https://ipfs.io/");
        } else if (imgUrl?.startsWith("ipfs://")) {
            imgUrl = imgUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
        }
        return imgUrl;
    };

    const getOpenseaUrl = (nft: any) =>
        `https://opensea.io/assets/${nft.token_address}/${nft.token_id}`;

    const getDescription = (nft: any) => nft.metadata?.description || null;

    // const handleClickNft = (nft: any) => {
    //     setNftModalInfo({
    //         name: getName(nft),
    //         imageUrl: getImageUrl(nft),
    //         openseaUrl: getOpenseaUrl(nft),
    //         tokenAddress: nft.token_address,
    //         description: getDescription(nft),
    //     });
    // };

    return (
        <TableContainer component={Paper}>
          POAPs
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell align="left">
                    <img
                      src={
                        poap.logo ||
                        "https://etherscan.io/images/main/empty-token.png"
                      }
                      alt="nologo"
                      width="28px"
                      height="28px"
                    />
                  </TableCell> */}

                  {/* <TableCell component="th" scope="row">
                    {row.symbol}
                  </TableCell> */}

                  <TableCell align="left">{getName(poap)}</TableCell>
                  <TableCell align="left"><Link href={getImageUrl(poap)}>Image link</Link></TableCell>
                  <TableCell align="left"><Link href={getOpenseaUrl(poap)}>OpenSea link</Link></TableCell>
                  <TableCell align="left">{poap.token_address}</TableCell>
                  <TableCell align="left">{getDescription(poap)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br/>
          Other NFTs
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell align="left">
                    <img
                      src={
                        poap.logo ||
                        "https://etherscan.io/images/main/empty-token.png"
                      }
                      alt="nologo"
                      width="28px"
                      height="28px"
                    />
                  </TableCell> */}

                  {/* <TableCell component="th" scope="row">
                    {row.symbol}
                  </TableCell> */}

                  <TableCell align="left">{getName(otherNft)}</TableCell>
                  <TableCell align="left"><Link href={getImageUrl(otherNft)}>Image link</Link></TableCell>
                  <TableCell align="left"><Link href={getOpenseaUrl(otherNft)}>OpenSea link</Link></TableCell>
                  <TableCell align="left">{otherNft.token_address}</TableCell>
                  <TableCell align="left">{getDescription(otherNft)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        
    );
    

    // return (
    //     <>
    //         <div className={styles.nftSection}>
    //             <Typography color={"#989898"} margin={1}>
    //                 POAPs
    //             </Typography>
    //             <div className={styles.nftList}>
    //                 {isLoading ? (
    //                     <CircularProgress />
    //                 ) : poaps?.length ? (
    //                     poaps.map((poap: any) => (
    //                         <NftListItem
    //                             key={poap.id}
    //                             name={getName(poap)}
    //                             imageUrl={getImageUrl(poap)}
    //                             onClick={() => handleClickNft(poap)}
    //                         />
    //                     ))
    //                 ) : (
    //                     <Typography className={styles.noNftsInSection}>
    //                         No POAPS :(
    //                     </Typography>
    //                 )}
    //             </div>
    //         </div>
    //         <div className={styles.nftSection}>
    //             <Typography color={"#989898"} margin={1}>
    //                 NFTs Gallery
    //             </Typography>
    //             <div className={styles.nftList}>
    //                 {isLoading ? (
    //                     <CircularProgress />
    //                 ) : otherNfts?.length ? (
    //                     otherNfts.map((nft: any) => (
    //                         <NftListItem
    //                             key={nft.id}
    //                             name={getName(nft)}
    //                             imageUrl={getImageUrl(nft)}
    //                             onClick={() => handleClickNft(nft)}
    //                         />
    //                     ))
    //                 ) : (
    //                     <Typography className={styles.noNftsInSection}>
    //                         No NFTs :(
    //                     </Typography>
    //                 )}
    //             </div>
    //         </div>
    //         {nftModalInfo && (
    //             <NftModal
    //                 onClose={() => setNftModalInfo(null)}
    //                 name={nftModalInfo.name}
    //                 description={nftModalInfo.description}
    //                 imageUrl={nftModalInfo.imageUrl}
    //                 openseaUrl={nftModalInfo.openseaUrl}
    //             />
    //         )}
    //     </>
    // );
};