import { followListInfoQuery, searchUserInfoQuery } from '@/utils/query';
import { FollowListInfoResp, SearchUserInfoResp, Network } from '@/utils/types';
import styles from '@/pages/index.module.css';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { formatAddress, removeDuplicate, isValidAddr } from '@/utils/helper';
import {
  Stack,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Avatar,
  ListItemIcon,
  Typography,
} from '@mui/material';

export interface FollowListProps {
  address: string;
  network: string;
}

export const FollowList: React.FC<FollowListProps> = (props: FollowListProps) => {
  const [followListInfo, setFollowListInfo] = useState<FollowListInfoResp | null>(null);
  const [followLoading, setFollowLoading] = useState<boolean>(false);
  const [searchAddrInfo, setSearchAddrInfo] = useState<SearchUserInfoResp | null>(null);

  const fetchSearchAddrInfo = async (toAddr: string) => {
    const resp = await searchUserInfoQuery({
      fromAddr: props.address,
      toAddr,
      network: props.network,
    });

    if (resp) {
      setSearchAddrInfo(resp);
    }
  };

  // Get the current user followings and followers list
  const initFollowListInfo = async () => {
    if (!props.address) {
      return;
    }

    const resp = await followListInfoQuery({
      address: props.address,
      namespace: 'CyberConnect',
      network: props.network,
      followingFirst: 10,
      followerFirst: 10,
    });
    if (resp) {
      setFollowListInfo(resp);
    }
  };

  const fetchMore = async (type: 'followings' | 'followers') => {
    if (!props.address || !followListInfo) {
      return;
    }

    const params =
      type === 'followers'
        ? {
            address: props.address,
            namespace: 'CyberConnect',
            network: props.network,
            followerFirst: 10,
            followerAfter: followListInfo.followers.pageInfo.endCursor,
          }
        : {
            address: props.address,
            namespace: 'CyberConnect',
            network: props.network,
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
  }, [props.address, props.network]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {followListInfo && (
        <Stack>
          <Typography variant="h6"> CyberConnect Social </Typography>
          <div className={styles.listsContainer}>
            <div className={styles.list}>
              <Button>
                <Typography>Followers</Typography>
                <Box component="span" sx={{ marginLeft: '.5rem', fontWeight: 'bold' }}>
                  {followListInfo.followerCount}
                </Box>
              </Button>

              <div className={styles.followList}>
                {followListInfo.followers.list.map((user) => {
                  return (
                    <div key={user.address} className={styles.user}>
                      <Avatar src={user.avatar} className={styles.avatar} />
                      <div className={styles.userAddress}>
                        {user.domain || formatAddress(user.address)}
                      </div>
                    </div>
                  );
                })}
                {followListInfo.followers.pageInfo.hasNextPage && (
                  <LoadingButton onClick={() => fetchMore('followers')}>See More</LoadingButton>
                )}
              </div>
            </div>

            <div className={styles.list}>
              <Button>
                <Typography>Following</Typography>
                <Box component="span" sx={{ marginLeft: '.5rem', fontWeight: 'bold' }}>
                  {followListInfo.followingCount}
                </Box>
              </Button>

              <List>
                {followListInfo.followings.list.map((user) => {
                  return (
                    <ListItem>
                      <ListItemIcon>
                        <Avatar src={user.avatar} className={styles.avatar} />
                      </ListItemIcon>
                      <ListItemText primary={user.domain || formatAddress(user.address)} />
                    </ListItem>
                  );
                })}
              </List>
              {followListInfo.followings.pageInfo.hasNextPage && (
                <LoadingButton onClick={() => fetchMore('followings')}>See More</LoadingButton>
              )}
            </div>
          </div>
        </Stack>
      )}
    </Box>
  );
};
