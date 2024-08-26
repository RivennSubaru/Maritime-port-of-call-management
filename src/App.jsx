import { Outlet, Link, useNavigate } from 'react-router-dom'
import './App.css'
import Dashboard from './component/Dashboard'
import { Box, styled } from '@mui/material';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function App() {
  const navigateTo = useNavigate();

  /* useEffect(() => {
    if (!(localStorage.getItem("userMail"))) {
      navigateTo("/connexion");
    }
  }) */

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  // Recuperation des donnée à afficher
  const fetchData = async () => {
    const reponse = await axios.get("http://localhost:8081/escale/getAllLate");
    return reponse.data;
  }
  const {isPending, isError, data:retards = [], error} = useQuery({
      queryKey: ['retard'],
      queryFn: fetchData
  });

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Dashboard isPending={isPending} isError={isError} retards={retards}/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader/>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default App
