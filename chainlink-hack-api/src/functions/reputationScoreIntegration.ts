import { MoralisChainOptions } from '../utils/types';
import moralis from 'moralis/node';
import moment from 'moment';
import 'dotenv/config';

// Load moralis SDK
const MORALIS_SERVER_URL: string = process.env.MORALIS_SERVER_URL || "";
const MORALIS_APP_ID: string = process.env.MORALIS_APP_ID || "";
moralis.start({ serverUrl: MORALIS_SERVER_URL, appId: MORALIS_APP_ID });



// function to get avg txns per month for past six months of history
export const getAvgTxnsPastSixMonths = async (chain: MoralisChainOptions, address: string): Promise<number> => {
  const toDate: string = moment().format();
  const fromDate: string = moment().subtract(6, 'months').format(); 
  const pastSixMonthsTxns = await moralis.Web3API.account
    .getTransactions({chain: chain, address: address, from_date: fromDate, to_date: toDate})
    .catch((err) => {
      console.log(err);
      return null;
    });

  // pastSixMonthsTxns?.['total'] is total number of transactions over past 6 months
  if (pastSixMonthsTxns?.['total'] === undefined) {
    return 0;
  }
  else {
    return pastSixMonthsTxns?.['total'] / 6;
  }
};

// function to get age of account in months
export const getAccountAgeMonths = async (chain: MoralisChainOptions, address: string): Promise<number> => {
  // get all transactions for address + chain
  let allTxns = await moralis.Web3API.account
    .getTransactions({chain: chain, address: address})
    .catch((err) => {
      console.log(err);
      return null;
    });

  // return 0 if no txn history on-chain
  if (allTxns?.['total'] && allTxns?.['page_size'] && allTxns?.['total'] !== 0) {
    // get last "page" of transactions if transaction history spans multiple pages
    if (allTxns?.['total'] > allTxns?.['page_size']){
      const offset: number = allTxns?.['total'] - (allTxns?.['total'] % allTxns?.['page_size']);
      console.log("Total transactions (" + allTxns?.['total'] + ") greater than page size (" + allTxns?.['page_size'] + "). Getting last page using offset of: " + offset);
      allTxns = await moralis.Web3API.account
        .getTransactions({chain: chain, address: address, offset: offset})
        .catch((err) => {
          console.log(err);
          return null;
        });
      console.log("Getting last page (page " + allTxns?.['page'] + ") of transactions.");
    }
  }
  else {
    return 0;
  }

  // calculate age of address using months since first transaction
  // return 0 if any required parameters are 0
  if (allTxns !== undefined && allTxns?.result !== undefined) {
    const firstTxn = allTxns.result[allTxns.result.length - 1];
    if (firstTxn === undefined) {
      return 0;
    }
    console.log("Timestamp of first transaction: " + moment(firstTxn['block_timestamp']).toString());  
    const monthsSinceFirstTxn: number = moment().diff(moment(firstTxn['block_timestamp']), 'months'); // off by 1
    return monthsSinceFirstTxn;
  }
  else {
    return 0;
  }
};


export const getReputationScore = async (chain: MoralisChainOptions, address: string): Promise<number | null> => {
    // determine age score for this account (50% of score)
    const monthsSinceFirstTxn: number = await getAccountAgeMonths(chain, address);
    const ageScore: number = 5 - (1.05**(-monthsSinceFirstTxn))*5;
    console.log("monthsSinceFirstTxn: " + monthsSinceFirstTxn);
    console.log("ageScore is: " + ageScore);

    // determine avg number of transactions in last 6 months (50% of score)
    const avgTxnsSixMonths: number = await getAvgTxnsPastSixMonths(chain, address);
    const avgTxnsSixMonthsScore: number = 5 - (1.07**(-avgTxnsSixMonths))*5;
    console.log("avgTxnsSixMonths: " + avgTxnsSixMonths);
    console.log("avgTxnsSixMonthsScore is: " + avgTxnsSixMonthsScore);

    // calculate reputation score
    const reputationScore: number = ageScore + avgTxnsSixMonthsScore;
    console.log("Reputation Score is: " + reputationScore);

    return reputationScore;
  };