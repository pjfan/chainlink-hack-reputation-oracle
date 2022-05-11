import React from 'react';
import { getProfile, updateProfile } from '../../hooks/useBasicProfile';
import type { IDX } from '@ceramicstudio/idx';
import { Box, Card, CardContent, Divider, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import { EditProfileDialog } from './EditProfileDialog';
import { ProfilePicAvatar } from './ProfilePicAvatar';

interface IUserProfile {
  name: string;
  description: string;
}

interface ProfileInfoCardProps {
  idx: IDX | undefined;
}

export const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ idx }: ProfileInfoCardProps) => {
  const [profileData, setProfileData] = React.useState<IUserProfile>({
    name: 'Default',
    description: 'Default',
  });
  React.useEffect(() => {
    const fetchUserProfile = async () => {
      // await updateProfile();
      let userProfile;
      if (idx !== undefined) {
        userProfile = await getProfile(idx);
      }

      const profileData: IUserProfile = {
        name: userProfile?.name ?? 'None',
        description: userProfile?.description ?? 'None',
      };
      setProfileData(profileData);
    };
    fetchUserProfile();
  }, [profileData]);

  return (
    <>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <ProfilePicAvatar />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                gap: { xsm: 5 },
              }}
            >
              <Typography variant="h4">{profileData.name}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                gap: { xsm: 5 },
              }}
            >
              <Typography variant="subtitle2">{profileData.description}</Typography>
            </Box>
            <EditProfileDialog idx={idx} />
          </Box>
          <Divider light />
          <Typography variant="body1">Your DID: {idx?.id}</Typography>
        </CardContent>
      </Card>
    </>
  );
};
