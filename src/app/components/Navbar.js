import React from 'react';
import Link from 'next/link';
import { Stack } from '@mui/material';

const Navbar = () => (
  <Stack direction="row" justifyContent="space-around" sx={{ gap: { sm: '123px', xs: '40px' }, mt: { sm: '32px', xs: '20px' }, justifyContent: 'none' }} px="20px">
    <Link href="/">
      <img src={"Logo.png"} alt="logo" style={{ width: '48px', height: '48px', margin: '0px 20px' }} />
    </Link>
    <Stack
      direction="row"
      gap="40px"
      fontFamily="Alegreya"
      fontSize="24px"
      alignItems="flex-end"
    >
      <Link href="/" style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #FF2625' }}>Home</Link>
      <Link href="/exerciseplan" style={{ textDecoration: 'none', color: '#3A1212' }}>Exercises Plan</Link>
    </Stack>
  </Stack>
);

export default Navbar;
