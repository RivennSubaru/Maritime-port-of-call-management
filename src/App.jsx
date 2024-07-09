import { Outlet, Link, useNavigate } from 'react-router-dom'
import './App.css'
import Dashboard from './component/Dashboard'
import { Box, styled } from '@mui/material';
import { useEffect } from 'react';

function App() {
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!(localStorage.getItem("userMail"))) {
      navigateTo("/connexion");
    }
  })

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Dashboard />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default App
