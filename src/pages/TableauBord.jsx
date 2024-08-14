import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import StatBox from '../component/StatBox';
import EscaleCountCard from '../component/EscaleCountCard';
import EscaleManager from '../component/EscaleManager';

const TableauBord = () => {
  return (
    <div style={{width: "75%",
      height: "100%",
      display: "flex",
      flexWrap: "wrap",
      gap: "18px",
      margin: "auto"
      }}
    >
      <StatBox/>
      <EscaleCountCard/>
      <EscaleManager/>
    </div>
  );
};

export default TableauBord;
