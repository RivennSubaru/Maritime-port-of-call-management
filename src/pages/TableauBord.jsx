import React from 'react';
import { Grid, Box, Paper, Container } from '@mui/material';
import StatBox from '../component/StatBox';
import EscaleCountCard from '../component/EscaleCountCard';
import EscaleManager from '../component/EscaleManager';

const TableauBord = () => {
  const role = localStorage.getItem('role') === "admin"; // Vérification du rôle de l'utilisateur

  return (
      <Container maxWidth="lg" sx={{ mt: 2}}>
        <Grid container spacing={4}>
          {
          role && 
            <>
              {/* StatBox - comme le graphique */}
              <Grid item xs={12} md={8} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 280, // Augmenter la hauteur si nécessaire
                    borderRadius: "10px"
                  }}
                >
                  <StatBox />
                </Paper>
              </Grid>

              {/* EscaleCountCard - comme la carte */}
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 280, // Augmenter la hauteur pour correspondre au graphique
                    borderRadius: "10px"
                  }}
                >
                  <EscaleCountCard />
                </Paper>
              </Grid>
            </>
          }

          {/* EscaleManager - comme la table de liste */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', padding: "46px 100px", gap: "20vw", borderRadius: "10px" }}>
              <EscaleManager />
            </Paper>
          </Grid>
        </Grid>
      </Container>
  );
};

export default TableauBord;
