import { FormControl, Box, TextField, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { ChainSelectionDropDown } from './ChainSelectionDropDown';
import { useSearchContext } from 'src/hooks/useSearch';

export const Search: React.FC = () => {
  const { setAddress } = useSearchContext();

  return (
    <Box sx={{ display: 'flex', mt: '50px' }}>
      <TextField
        fullWidth
        placeholder="Search any wallet address"
        type="search"
        variant="filled"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <ChainSelectionDropDown />
    </Box>
  );
};
