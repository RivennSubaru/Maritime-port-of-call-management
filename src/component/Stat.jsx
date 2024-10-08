import React, { useState, useMemo } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { MenuItem, Select, FormControl, InputLabel, Typography, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Simulation
/* const countPerDay = [
  {"mois": 1, "jours": 2, "count": 2},
  {"mois": 1, "jours": 5, "count": 10},
  {"mois": 2, "jours": 1, "count": 7},
  {"mois": 2, "jours": 4, "count": 8},
  {"mois": 2, "jours": 5, "count": 8},
  {"mois": 2, "jours": 6, "count": 4},
  {"mois": 2, "jours": 7, "count": 12},
  {"mois": 3, "jours": 10, "count": 7},
  {"mois": 4, "jours": 4, "count": 8},
  {"mois": 4, "jours": 5, "count": 9},
  {"mois": 5, "jours": 1, "count": 15},
  {"mois": 5, "jours": 2, "count": 10},
  {"mois": 5, "jours": 3, "count": 4}
]; */

/*******  CORRESPONDANCE DES MOIS *******/
const monthNames = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export default function Stat() {
  const [selectedMonth, setSelectedMonth] = useState(1); // Mois par défaut sélectionné

  /****** RECUPERATION DU TOKEN ******/
  const token = localStorage.getItem('token');

  /****** FETCH DES DONNÉES *****/
  const fetchData = async () => {
    const reponse = await axios.get("http://localhost:8081/escale/getFinPerDay", {
      headers: {
        Authorization: token
      }
    });

    return reponse.data;
  }
  const {isPending, isError, data:countPerDay = [], error} = useQuery({
      queryKey: ['lineChart'],
      queryFn: fetchData
  });

  /**** FILTRER LES DONNÉES EN FONCTION DU MOIS SÉLECTIONNÉ ****/
  const filteredData = useMemo(() => {
    return countPerDay.filter(item => item.mois === selectedMonth);
  }, [selectedMonth]);

  /**** EXTRAIRE LES LABELS ET LES DONNÉES POUR LE GRAPHIQUE ****/
  const xLabels = filteredData.map(item => `Jour ${item.jours}`);
  const yData = filteredData.map(item => item.count);
  
  if (isPending) {
    return (
        <>
          <p>chargement des données...</p>
        </>
    )
  }

  if (isError) {
    console.log(error);
    return (
        <>
            <p>Une erreur s'est produit</p>
        </>
    )
  }

  return (
    <div>
      <FormControl sx={{width: '10vw'}}>
        <InputLabel id="month-select-label">Mois</InputLabel>
        <Select
          labelId="month-select-label"
          value={selectedMonth}
          label="Mois"
          size='small'
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {monthNames.map((name, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 450, // Augmenter la hauteur si nécessaire
          width: '75%',
          borderRadius: "10px",
          marginTop: "1.5vw"
        }}
      >
        <LineChart
          width={900}
          height={450}
          series={[
            { data: yData, label: `Escales pour le mois de ${monthNames[selectedMonth - 1]}` }
          ]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
        />
      </Paper>
    </div>
  );
}
