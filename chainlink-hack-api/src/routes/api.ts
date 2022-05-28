import express, { Request, Response, Router} from 'express';
import { getTokenBalances } from '../functions/erc20Integration';
import { getActivityInfo } from '../functions/activityIntegration';
import { getReputationScore } from '../functions/reputationScoreIntegration';
import { WalletBalance, MoralisChainOptions, NFTMetadata } from '../utils/types';
import { getNFTs } from '../functions/nftpoapIntegration';

// setup express Router
const router: Router = express.Router();

/* GET api root */
router.get('/', function(req: Request, res: Response): Response {
  return res.json({
      "apiEndPoints": "/api/reputation/:chain/:address, /api/erc20/:chain/:address, /api/nft/:chain/:address, /api/poap/:chain/:address, /api/address_history/:chain/:address"
    });
});

router.get('/reputation/:chain/:address', async function(req: Request, res: Response): Promise<Response> {
  const address: string = req.params.address;
  const chain: MoralisChainOptions = <MoralisChainOptions>req.params.chain;
  const reputationScore: number | null = await getReputationScore(chain, address);
  const reputation = {
    "reputation": reputationScore,
  };
  return res.json(reputation);
});

router.get('/erc20/:chain/:address', async function(req: Request, res: Response): Promise<Response> {
  const address: string = req.params.address;
  const chain: MoralisChainOptions = <MoralisChainOptions>req.params.chain;
  const tokenBalances: WalletBalance[] | null = await getTokenBalances(address, chain);
  // const totalValueUsd: number | undefined = tokenBalances?.reduce((sum, current) => {
  //     if (current.value) {
  //       return sum + current.value;
  //     }
  //     else{
  //       return sum;    
  //     }
  //   }, 0);
  const erc20 = {
    "tokenBalances": tokenBalances,
    // "totalValueUsd": totalValueUsd, 
  };
  return res.json(erc20);
});

router.get('/address_history/:chain/:address', async function(req: Request, res: Response): Promise<Response> {
  const address: string = req.params.address;
  const chain: MoralisChainOptions = <MoralisChainOptions>req.params.chain;
  const activityInfo = await getActivityInfo(chain, address);
  const addressHistory = {
    "txnPerMonth": activityInfo?.transactionsPerMonth,
    "activeBuyerSeller": activityInfo?.activeBuyerSeller,
    "monthsSinceFirstTxn": activityInfo?.monthsSinceFirstTransaction,
    "existedLongEnough": activityInfo?.existedLongEnough,
    "userIsActive": activityInfo?.userIsActive,
  };
  return res.json(addressHistory);
});

router.get('/nft/:chain/:address', async function(req: Request, res: Response): Promise<Response> {
  const address: string = req.params.address;
  const chain: MoralisChainOptions = <MoralisChainOptions>req.params.chain;
  const nfts: NFTMetadata[] | null = await getNFTs(address, chain, false);
  return res.json(nfts);
});

router.get('/poap/:chain/:address', async function(req: Request, res: Response): Promise<Response> {
  const address: string = req.params.address;
  const chain: MoralisChainOptions = <MoralisChainOptions>req.params.chain;
  const poaps: NFTMetadata[] | null = await getNFTs(address, chain, true);
  return res.json(poaps);
});

router.get('/profile/:chain/:address', function(req: Request, res: Response): Response {
  const profile = {
    "name": "",
    "description": "",
    "profilePhoto": ""
  };
  return res.json(profile);
});

router.get('/DID/:chain/:address', function(req: Request, res: Response): Response {
  const did = {
    "did": "",
  };
  return res.json(did);
});

router.get('/follow_metrics/:chain/:address', function(req: Request, res: Response): Response {
  const followMetrics = {
    "followCount": "",
    "totalValueFollowers": "",
    "followingCount": ""
  };
  return res.json(followMetrics);
});

export const apiRouter: Router = router;