import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import type { IDX } from '@ceramicstudio/idx';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getProfile, updateProfile } from '../../hooks/useBasicProfile';

interface EditProfileDialogProps {
  idx: IDX | undefined;
}

export const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  idx,
}: EditProfileDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted name:%s, description:%s', name, description);
    if (idx !== undefined) {
      updateProfile(idx, name, description);
    }

    setOpen(false);
  };

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      let userProfile;
      if (idx !== undefined) {
        userProfile = await getProfile(idx);
      }

      setName(userProfile?.name ?? 'None');
      setDescription(userProfile?.description ?? 'None');
    };
    fetchUserProfile();
  }, [open]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="profile-update-form">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              defaultValue={name}
              fullWidth
              variant="filled"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              multiline
              fullWidth
              defaultValue={description}
              rows={4}
              variant="standard"
              onChange={(e) => setDescription(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} type="submit" form="profile-update-form">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
