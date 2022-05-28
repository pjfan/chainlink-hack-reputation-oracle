import { ActivityInfo, MoralisChainOptions } from '../utils/types';
import moralis from 'moralis/node';
import moment from 'moment';
import 'dotenv/config';

// Load moralis SDK
const MORALIS_SERVER_URL: string = process.env.MORALIS_SERVER_URL || "";
const MORALIS_APP_ID: string = process.env.MORALIS_APP_ID || "";
moralis.start({ serverUrl: MORALIS_SERVER_URL, appId: MORALIS_APP_ID });


export const getPastSixMo = async (chain: MoralisChainOptions, address: string, from_date: string, to_date: string) => {
  return await moralis.Web3API.account
    .getTransactions({chain: chain, address: address, from_date: from_date, to_date: to_date})
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getHistory = async (chain: MoralisChainOptions, address: string) => {
  let history = await moralis.Web3API.account
    .getTransactions({chain: chain, address: address})
    .catch((err) => {
      console.log(err);
      return null;
    });
  if (history?.['total'] && history?.['page_size'] && history?.['total'] !== 0) {
    if (history?.['total'] > history?.['page_size']){
      const offset: number = history?.['total'] - (history?.['total'] % history?.['page_size']);
      console.log("Total transactions (" + history?.['total'] + ") greater than page size (" + history?.['page_size'] + "). Getting last page using offset of: " + offset);
      history = await moralis.Web3API.account
        .getTransactions({chain: chain, address: address, offset: offset})
        .catch((err) => {
          console.log(err);
          return null;
        });
      console.log("Getting last page (page " + history?.['page'] + ") of transactions.");
    }
  }
  return history;
};


export const getActivityInfo = async (chain: MoralisChainOptions, address: string): Promise<ActivityInfo | undefined> => {
  // Get past 6 months of transactions for address on chain  
  const today: string = moment().format();
  const sixMonthsAgo: string = moment().subtract(6, 'months').format();
  const pastSixMo = await getPastSixMo(chain, address, sixMonthsAgo, today);
  if (pastSixMo === undefined || pastSixMo?.result?.length === 0) return;

  let numTransactionsPastSixMo: number | undefined = pastSixMo?.['total'];
  if (numTransactionsPastSixMo === undefined) {
    numTransactionsPastSixMo = 1;
  }
  const transactionsPerMonth: number = numTransactionsPastSixMo / 6;
  const activeBuyerSeller: boolean = transactionsPerMonth > 2;

  //
  const history = await getHistory(chain, address);
  if (history !== undefined && history?.result !== undefined) {
    const firstTransaction = history.result[history.result.length - 1];
    if (firstTransaction === undefined) return;

    const firstTransactionTimestamp: moment.Moment = moment(firstTransaction['block_timestamp']);
    const monthsSinceFirstTransaction: number = moment().diff(firstTransactionTimestamp, 'months'); // off by 1
    const existedLongEnough: boolean = monthsSinceFirstTransaction >= 6;
    const userIsActive: boolean = existedLongEnough && activeBuyerSeller;

    const activityInfoResult: ActivityInfo = {
      transactionsPerMonth: transactionsPerMonth,
      activeBuyerSeller: activeBuyerSeller,
      monthsSinceFirstTransaction: monthsSinceFirstTransaction,
      existedLongEnough: existedLongEnough,
      userIsActive: userIsActive,
    };

    console.log(activityInfoResult);

    return activityInfoResult;
  }
};
