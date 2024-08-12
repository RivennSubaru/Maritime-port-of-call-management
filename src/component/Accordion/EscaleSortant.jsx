import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: 'none',
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Ajout d'une ombre douce
  '&:not(:last-child)': {
    marginBottom: '16px',
  },
  overflow: 'hidden',
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  color: 'rgba(65, 65, 65, 1)',
  backgroundColor: 'rgba(196, 255, 251, 1)',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  color: 'rgba(85, 85, 85, 1)',
  backgroundColor: 'rgba(241, 255, 254, 1)',
  padding: theme.spacing(2),
  borderTop: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  marginTop: theme.spacing(2),
}));

const ScrollableContainer = styled('div')({
  maxHeight: '400px', // Ajustez cette valeur en fonction de la taille de votre conteneur parent
  overflowY: 'auto',
});

const EscaleSortant = () => {

  // Recuperation des donnée à afficher
  const fetchData = async () => {
    const reponse = await axios.get("http://localhost:8081/escale/getCurrEntrant");
    return reponse.data;
  }
  const {isPending, isError, data:escales = [], error} = useQuery({
      queryKey: ['escale'],
      queryFn: fetchData
  });

  if (isPending) {
    return <h3>chargement de la liste...</h3>  
  }

  if (isError) {
      console.log(error);
      return <h3>Une erreur s'est produit</h3>
  }

  return ( 
    <ScrollableContainer>
      <Typography variant="h6" gutterBottom>
        Navires se préparant à sortir
      </Typography>
      {escales.map((escale, index) => (
        <Accordion key={index}>
          <AccordionSummary aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
            <Typography>{escale.nomNav}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>N° Escale : {escale.numEscale}</Typography>
            <Typography>Code navire : {escale.numNav}</Typography>
            <Typography>Quai attribué : {escale.nomQuai}</Typography>
            <Typography>Départ estimé : {escale.heureArrivEst}</Typography>
            <ButtonContainer>
            <Button 
                variant="contained" 
                color="primary" 
                size="small"
                sx={{
                    backgroundColor: 'rgba(74, 136, 255, 1)', // Couleur de fond personnalisée
                    '&:hover': {
                    backgroundColor: 'rgba(56, 104, 195, 1)', // Couleur de fond au survol
                    },
                    textTransform: 'none', // Garde le texte tel qu'il est, sans le transformer en majuscules
                }}
            >
                Partir
            </Button>
            </ButtonContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </ScrollableContainer>
  );
}

export default EscaleSortant;