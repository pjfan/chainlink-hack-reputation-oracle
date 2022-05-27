import { followListInfoQuery, searchUserInfoQuery } from '@/utils/query';
import { FollowListInfoResp, SearchUserInfoResp, Network } from '@/utils/types';
import { useEffect, useState } from 'react';
import { formatAddress, removeDuplicate, isValidAddr } from '@/utils/helper';

export const useFollow = (address: string, network: string) => {
  const [followListInfo, setFollowListInfo] = useState<FollowListInfoResp | null>(null);
  const [followLoading, setFollowLoading] = useState<boolean>(false);
  const [searchAddrInfo, setSearchAddrInfo] = useState<SearchUserInfoResp | null>(null);

  const fetchSearchAddrInfo = async (toAddr: string) => {
    const resp = await searchUserInfoQuery({
      fromAddr: address,
      toAddr,
      network: network,
    });

    if (resp) {
      setSearchAddrInfo(resp);
    }
  };

  // Get the current user followings and followers list
  const initFollowListInfo = async () => {
    if (!address) {
      return;
    }

    const resp = await followListInfoQuery({
      address,
      namespace: 'CyberConnect',
      network: network,
      followingFirst: 10,
      followerFirst: 10,
    });
    if (resp) {
      setFollowListInfo(resp);
    }
  };

  const fetchMore = async (type: 'followings' | 'followers') => {
    if (!address || !followListInfo) {
      return;
    }

    const params =
      type === 'followers'
        ? {
            address,
            namespace: 'CyberConnect',
            network: network,
            followerFirst: 10,
            followerAfter: followListInfo.followers.pageInfo.endCursor,
          }
        : {
            address,
            namespace: 'CyberConnect',
            network: network,
            followingFirst: 10,
            followingAfter: followListInfo.followings.pageInfo.endCursor,
          };

    const resp = await followListInfoQuery(params);
    if (resp) {
      type === 'followers'
        ? setFollowListInfo({
            ...followListInfo,
            followers: {
              pageInfo: resp.followers.pageInfo,
              list: removeDuplicate(followListInfo.followers.list.concat(resp.followers.list)),
            },
          })
        : setFollowListInfo({
            ...followListInfo,
            followings: {
              pageInfo: resp.followings.pageInfo,
              list: removeDuplicate(followListInfo.followings.list.concat(resp.followings.list)),
            },
          });
    }
  };

  useEffect(() => {
    initFollowListInfo();
  }, [address]);

};