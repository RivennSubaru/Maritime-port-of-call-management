import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const EscaleCountCard = () => {
  const fetchData = async () => {
    const reponse = await axios.get("http://localhost:8081/escale/getCount");
    return reponse.data;
  }
  const {isPending, isError, data:counts = [], error} = useQuery({
      queryKey: ['count'],
      queryFn: fetchData
  });

  if (isPending) {
    return (
        <>
            <p>chargement...</p>
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
        Nombre d'escales
      </Typography>
      <Typography variant="h3" sx={{ margin: '24px 0 0 0', fontSize: "2.5rem" }}>
        {counts[0].total > 1 ? `${counts[0].total} escales` : `${counts[0].total} escale`}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '3px' }}>
        Ce mois de Juillet 2024
      </Typography>
      <Typography variant="body2" sx={{ color: '#FF00FF', maxWidth: "67%" }}>
        { counts[0].nombreTermine > 1 ? `${counts[0].nombreTermine} terminées,` : `${counts[0].nombreTermine} terminée,` }
        { counts[0].nombrePrevu > 1 ? ` ${counts[0].nombrePrevu} prévues` : ` ${counts[0].nombrePrevu} prévue` }
        {` et ${counts[0].nombreActif} en cours`}
      </Typography>
      <Link href="/escale" sx={{ display: 'block', marginTop: '50px', fontSize: '14px' }}>
        Voir la liste
      </Link>
    </>
  );
};

export default EscaleCountCard;
