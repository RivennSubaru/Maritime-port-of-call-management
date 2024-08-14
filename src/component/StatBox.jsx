// StatBox.js
import React, { useMemo } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/material';

// Simulation
const countPerDay = [
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
];

export default function StatBox() {

    /****** FETCH DES DONNÉES *****/
    /* const fetchData = async () => {
        const reponse = await axios.get("http://localhost:8081/escale/getFinPerDay");
        return reponse.data;
    }
    const {isPending, isError, data:countPerDay = [], error} = useQuery({
        queryKey: ['lineChart'],
        queryFn: fetchData
    }); */

    const currentMonth = new Date().getMonth() + 1; // Mois courant

    // Filtrer les données en fonction du mois courant
    const filteredData = useMemo(() => {
        return countPerDay.filter(item => item.mois === currentMonth);
    }, [currentMonth]);

    // Extraire les labels et les données pour le graphique
    const xLabels = filteredData.map(item => `j${item.jours}`);
    const yData = filteredData.map(item => item.count);

    /* if (isPending) {
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
    } */

    return (
        <Box
            sx={{
                width: 'fit-content',
                height: 'auto',
                padding: 2,
                borderRadius: '16px',
                backgroundColor: '#fff',
                flex: 1,
            }}
        >
            <LineChart
                width={500}
                height={250}
                series={[
                { data: yData, label: `Escales pour le mois de ${new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date())}` }
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
        </Box>
    );
}
