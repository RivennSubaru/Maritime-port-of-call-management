import React from 'react';
import { Grid, Typography } from '@mui/material';
import EscaleEntrant from './Accordion/EscaleEntrant';
import EscaleSortant from './Accordion/EscaleSortant';

const EscaleManager = () => {
  return (
    <>
      <Grid item xs={6}>
        <EscaleEntrant/>
      </Grid>
      <Grid item xs={6}>
        <EscaleSortant/>
      </Grid>
    </>
  );
}

export default EscaleManager;
