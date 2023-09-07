import { useState } from 'react';
import { useAuth } from '../context/Auth';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Snackbar,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CloseIcon from '@mui/icons-material/Close';
import Person2Icon from '@mui/icons-material/Person2';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function Navbar() {
  const [anchor, setAnchor] = useState(null);
  const [openBook, setOpenBook] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const open = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClickBook = () => {
    setOpenBook(true);
  };
  const handleCloseBook = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenBook(false);
  };

  const handleCloseProfile = () => {
    setAnchor(null);
    navigate('/myProfile');
  };
  const handleCloseLogout = () => {
    setAnchor(null);
    auth.logout();
    navigate('/login');
  };
  const handleClose = () => {
    setAnchor(null);
  };
  const handleLeaderboard = () => {
    setAnchor(null);
    navigate('/leaderboard');
  };
  const handleSettings = () => {
    setAnchor(null);
    navigate('/settings');
  };
  const handleStatistics = () => {
    setAnchor(null);
    navigate('/statistics');
  };

  const message = (
    <div>
      <p>Red Pin: Store has offers</p>
      <p>Green Pin: Store hasn't offers</p>
      <p>Blue Pin: your current location</p>
    </div>
  );

  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleCloseBook}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  );

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <ShoppingCartIcon />
        </IconButton>
        <Typography
          component={RouterLink}
          to='/'
          variant='h6'
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            boxShadow: 'none',
            color: 'white',
          }}
        >
          E-Supermarket
        </Typography>

        {auth.user ? (
          <div>
            <Button
              sx={{
                color: 'white',
                fontWeight: '500',
                letterSpacing: '1.1px',
                marginRight: '0.4rem',
              }}
              onClick={handleClickBook}
              startIcon={<MenuBookIcon />}
            >
              Guidebook
            </Button>
            <Snackbar
              open={openBook}
              onClose={handleCloseBook}
              message={message}
              action={action}
            />
            <Button
              startIcon={<Person2Icon />}
              id='basic-button'
              color='inherit'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                fontWeight: '500',
                letterSpacing: '1px',
              }}
            >
              {auth.user.name}
            </Button>
            <Menu
              id='basic-menu'
              anchorEl={anchor}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleCloseProfile}>
                <ListItemIcon>
                  <EditIcon color='primary' />
                </ListItemIcon>
                Profile
              </MenuItem>
              {/* based on the user's role display the corresponding menu */}
              {sessionStorage.getItem('role') === 'admin' ? (
                <MenuItem onClick={handleLeaderboard}>
                  <ListItemIcon>
                    <LeaderboardIcon color='primary' />
                  </ListItemIcon>
                  Leaderboard
                </MenuItem>
              ) : null}
              {sessionStorage.getItem('role') === 'admin' ? (
                <MenuItem onClick={handleStatistics}>
                  <ListItemIcon>
                    <ShowChartIcon color='primary' />
                  </ListItemIcon>
                  Statistics
                </MenuItem>
              ) : null}
              {sessionStorage.getItem('role') === 'admin' ? (
                <MenuItem onClick={handleSettings}>
                  <ListItemIcon>
                    <SettingsIcon color='primary' />
                  </ListItemIcon>
                  Settings
                </MenuItem>
              ) : null}
              <MenuItem onClick={handleCloseLogout}>
                <ListItemIcon>
                  <LogoutIcon color='primary' />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
