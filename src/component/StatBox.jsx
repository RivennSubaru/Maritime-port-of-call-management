import React, { useMemo } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// Simulation
/* const countPerDay = [
  {"mois": 8, "jours": 1, "count": 2},
  {"mois": 8, "jours": 5, "count": 10},
  {"mois": 8, "jours": 6, "count": 7},
  {"mois": 8, "jours": 8, "count": 8},
  {"mois": 8, "jours": 10, "count": 8},
  {"mois": 8, "jours": 11, "count": 4},
  {"mois": 8, "jours": 12, "count": 12},
  {"mois": 8, "jours": 15, "count": 7},
  {"mois": 8, "jours": 16, "count": 8},
  {"mois": 8, "jours": 20, "count": 9},
  {"mois": 8, "jours": 22, "count": 15},
  {"mois": 8, "jours": 25, "count": 10},
  {"mois": 8, "jours": 30, "count": 4}
]; */

export default function StatBox() {

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
    console.log(countPerDay);

    const currentMonth = new Date().getMonth() + 1; // Mois courant

    // Filtrer les données en fonction du mois courant
    const filteredData = useMemo(() => {
        return countPerDay.filter(item => item.mois === currentMonth);
    }, [currentMonth, countPerDay]);

    // Extraire les labels et les données pour le graphique
    const xLabels = filteredData.map(item => `j${item.jours}`);
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
        <>
            <Typography variant="subtitle2" sx={{ color: '#007AFF', fontSize: "1.2rem" }}>
                Ce mois-ci
            </Typography>
            <LineChart
                width={500}
                height={250}
                series={[
                { data: yData, label: `Escales pour le mois de ${new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date())}` }
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
        </>
    );
}
