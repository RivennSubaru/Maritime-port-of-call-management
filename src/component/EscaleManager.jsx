import React from 'react';
import { Grid, Typography } from '@mui/material';
import EscaleEntrant from './Accordion/EscaleEntrant';
import EscaleSortant from './Accordion/EscaleSortant';

const EscaleManager = () => {
  return (
    <Grid container spacing={6} style={{ padding: '16px', marginTop: 0, marginLeft: 0, backgroundColor: '#fff', borderRadius: '8px' }}>
      <Grid item xs={6}>
        <EscaleEntrant/>
      </Grid>
      <Grid item xs={6}>
        <EscaleSortant/>
      </Grid>
    </Grid>
  );
}

export default EscaleManager;
