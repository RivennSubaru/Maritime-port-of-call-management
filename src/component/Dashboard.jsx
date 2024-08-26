import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SailingIcon from '@mui/icons-material/Sailing';
import AnchorIcon from '@mui/icons-material/Anchor';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Badge, CircularProgress, Link } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import AvatarLogout from './AvatarLogout';
import { NavLink, useLocation } from 'react-router-dom'; // Utilisation de NavLink
import AvatarAndName from './AvatarAndName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Dashboard({ isPending, isError, retards }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const role = localStorage.getItem('role') === "admin"; // Vérification du rôle de l'utilisateur

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const RetardButton = () => {
    if (isPending) {
      return <CircularProgress color="secondary" size={25} />
    }

    if (isError) {
      return <ErrorIcon />
    }

    return (
      <IconButton href='/retard' color="inherit">
        <Badge badgeContent={retards.length} color="error">
          <AssignmentLateIcon />
        </Badge>
      </IconButton>
    );
  }

  const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/tableauBord' },
    { text: 'Liste des navires', icon: <DirectionsBoatIcon />, path: '/navire' },
    { text: 'Liste des quais', icon: <AnchorIcon />, path: '/quai' },
    { text: 'Liste des escales', icon: <SailingIcon />, path: '/escale' },
  ];

  // Ajout de l'élément de menu pour les statistiques si l'utilisateur est administrateur
  if (role) {
    menuItems.push({ text: 'Gerer utilisateurs', icon: <FontAwesomeIcon icon={faUsers} />, path: '/usermanager' });
    menuItems.push({ text: 'Statistique', icon: <ShowChartIcon />, path: '/stat' });
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            pr: '24px',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" flex={1}>
            SPAT
          </Typography>
          <RetardButton />
          <AvatarLogout />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* { open && <AvatarAndName/> } */}
        <List>
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.text}
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.54)',
              })}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: 'inherit',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </NavLink>
          ))}
        </List>
      </Drawer>
    </>
  );
}
