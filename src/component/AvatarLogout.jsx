import { IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const AvatarLogout = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const navigateTo = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Suppression des informations du localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("pseudo");
        localStorage.removeItem("role");

        // Redirection vers la page de connexion ou la page d'accueil
        navigateTo('/connexion'); // Utilisez votre méthode de navigation
    }

    return (
        <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Se deconnecter</MenuItem>
            </Menu>
        </div>
    );
};

export default AvatarLogout;