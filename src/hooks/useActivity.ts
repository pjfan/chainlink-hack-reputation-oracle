import { useEffect, useState } from 'react';
import { useMoralisWeb3Api, useMoralisWeb3ApiCall, useMoralis } from 'react-moralis';
import moment from 'moment';
import { MoralisChainOptions } from './useMoralisChainOptions';

export interface ActivityInfo {
  transactionsPerMonth: number;
  activeBuyerSeller: boolean;
  monthsSinceFirstTransaction: number;
  existedLongEnough: boolean;
  userIsActive: boolean;
}

export const useActivity = (
  address: string,
  chain: MoralisChainOptions
): ActivityInfo | undefined => {
  const { account } = useMoralisWeb3Api();
  const { isInitialized } = useMoralis();

  const {
    fetch: getPastSixMo,
    data: pastSixMo,
    error: error1,
    isLoading: isLoading1,
  } = useMoralisWeb3ApiCall(account.getTransactions, {
    chain: chain,
    address: address,
  });

  let {
    fetch: getHistory,
    data: history,
    error: error2,
    isLoading: isLoading2,
  } = useMoralisWeb3ApiCall(account.getTransactions, {
    chain: chain,
    address: address,
  });

  const [activityInfo, setActivityInfo] = useState<ActivityInfo | undefined>();

  useEffect(() => {
    if (isInitialized && address !== '') {
      getActivityInfo().then((activityInfo) => setActivityInfo(activityInfo));
    }
  }, [address, chain]);

  const getActivityInfo = async (): Promise<ActivityInfo | undefined> => {
    const today = moment().format();
    const sixMonthsAgo = moment().subtract(6, 'months').format();

    await getPastSixMo({
      params: { chain: chain, address: address, from_date: sixMonthsAgo, to_date: today },
    });

    if (pastSixMo === undefined || pastSixMo?.result?.length === 0) return;

    let numTransactionsPastSixMo = pastSixMo?.['total'];
    if (numTransactionsPastSixMo === undefined) {
      numTransactionsPastSixMo = 1;
    }

    const transactionsPerMonth = numTransactionsPastSixMo / 6;
    const activeBuyerSeller = transactionsPerMonth > 2;

    await getHistory({ params: { chain: chain, address: address } });
    if (history?.['total'] && history?.['page_size'] && history?.['total'] !== 0) {
      if (history?.['total'] > history?.['page_size']){
        const offset: number = history?.['total'] - (history?.['total'] % history?.['page_size']);
        console.log("Total transactions (" + history?.['total'] + ") greater than page size (" + history?.['page_size'] + "). Getting last page using offset of: " + offset);
        history = await account.getTransactions({chain: chain, address: address, offset: offset});
        console.log("Getting last page (page " + history?.['page'] + ") of transactions.");
      }
    }

    if (history !== undefined && history?.result !== undefined) {
      const firstTransaction = history.result[history.result.length - 1];
      if (firstTransaction === undefined) return;

      const firstTransactionTimestamp = moment(firstTransaction['block_timestamp']);
      const monthsSinceFirstTransaction = moment().diff(firstTransactionTimestamp, 'months'); // off by 1
      const existedLongEnough = monthsSinceFirstTransaction >= 6;
      const userIsActive = existedLongEnough && activeBuyerSeller;

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

  return activityInfo;
};
