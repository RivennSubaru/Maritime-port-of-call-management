import React, { useState, useMemo } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

// Données fournies par le backend
const dataFromBackend = [
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
];

// Correspondance des mois
const monthNames = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export default function Stat() {
  const [selectedMonth, setSelectedMonth] = useState(1); // Mois par défaut sélectionné

  // Filtrer les données en fonction du mois sélectionné
  const filteredData = useMemo(() => {
    return dataFromBackend.filter(item => item.mois === selectedMonth);
  }, [selectedMonth]);

  // Extraire les labels et les données pour le graphique
  const xLabels = filteredData.map(item => `Jour ${item.jours}`);
  const yData = filteredData.map(item => item.count);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="month-select-label">Mois</InputLabel>
        <Select
          labelId="month-select-label"
          value={selectedMonth}
          label="Mois"
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {monthNames.map((name, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <LineChart
        width={500}
        height={300}
        series={[
          { data: yData, label: `Escales pour le mois ${monthNames[selectedMonth - 1]}` }
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </div>
  );
}
