import { useRef, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from './MenuPopover';
import useUser from '../../lib/useUser';

import { useRouter } from 'next/router'

import fetchJson, { FetchError } from '../../lib/fetchJson'
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '/account',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '/settings',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {

  const router = useRouter();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(null);
  const {user, mutateUser } = useUser({
    redirectTo: '/login',
  })
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleMenuItem = (e) => {
    setOpen(null);
    router.push(e);
  }
  const handleLogout = async () => {
    setOpen(null);
    try {
      mutateUser(
        await fetchJson('/api/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        })
      )
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message)
      } else {
        console.error('An unexpected error happened:', error)
      }
    }
    router.push('/');
  }
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={user?.avatarUrl} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.login}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} onClick={() => handleMenuItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
