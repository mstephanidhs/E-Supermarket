import { useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person2Icon from "@mui/icons-material/Person2";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const [anchor, setAnchor] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const open = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchor(null);
    navigate("/myProfile");
  };
  const handleCloseLogout = () => {
    setAnchor(null);
    auth.logout();
    navigate("/login");
  };
  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <ShoppingCartIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            boxShadow: "none",
            color: "white",
          }}
        >
          E-Supermarket
        </Typography>

        {auth.user ? (
          <div>
            <Button
              startIcon={<Person2Icon />}
              id="basic-button"
              color="inherit"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                fontWeight: "500",
                letterSpacing: "1px",
              }}
            >
              {auth.user.name}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchor}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleCloseProfile}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleCloseLogout}>
                <ListItemIcon>
                  <LogoutIcon />
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
