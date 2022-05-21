import { FormControl, Box, TextField, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { ChainSelectionDropDown } from './ChainSelectionDropDown';
import { useSearchContext } from 'src/hooks/useSearch';

export const Search: React.FC = () => {
  const { setAddress } = useSearchContext();

  return (
    <Box sx={{ display: 'flex' }}>
      <TextField
        fullWidth
        defaultValue="Search any eth address"
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
