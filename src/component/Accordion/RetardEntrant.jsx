import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

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
  backgroundColor: '#f7f7f7',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  color: 'rgba(85, 85, 85, 1)',
  backgroundColor: 'white',
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
  maxHeight: '260px', 
  overflowY: 'auto',
});

const RetardEntrant = () => {
/* 
  const escales = [
    {
      nomNav: "Mercy Ships",
      numEscale: "2420241200123009",
      numNav: "3009",
      nomQuai: "MOLE A",
      heureArrivEst: "14h00",
    },
    {
      nomNav: "Lorem ipsum",
      numEscale: "2420241200123011",
      numNav: "3011",
      nomQuai: "MOLE D",
      heureArrivEst: "16h00",
    },
    {
      nomNav: "VOLAZARA",
      numEscale: "2420241200123008",
      numNav: "3008",
      nomQuai: "MOLE B",
      heureArrivEst: "13h00",
    },
    {
      nomNav: "Logos Hope",
      numEscale: "2420241200123010",
      numNav: "3010",
      nomQuai: "MOLE C",
      heureArrivEst: "15h00",
    },
  ]; */

  /**** QUERYCLIENT (actualisation de la liste) ****/
  const queryClient = useQueryClient();

  // envoie de requete au serveur
  const mutation = useMutation({

    mutationFn: async ({idEscale, idNav, idQuai, longueurDispo}) => {
      
      // Terminer l'escale
      await axios.post("http://localhost:8081/escale/update/finish", {idEscale});

      // Reduire la longueur disponible
      await axios.post("http://localhost:8081/quai/update/changeLongDispo", {idQuai, longueurDispo});

      // Amarrer le navire
      await axios.post("http://localhost:8081/navire/update/changeSituation", {idNav, situationNav: "Amarré"});

      // Associer le quai avec le navire
      await axios.post("http://localhost:8081/changement/add", {idNav, idQuai, typeChange: "escale"})
    },
    onError: (error) => {
        setTimeout(() => {
            toast(
                "Il semble que vous rencontriez un probleme.\n\n Le probleme peut venir soit de la connexion au serveur soit de la base de donnée ou une mauvaise connexion.\nVeuillez réessayer plus tard.",
                {
                  duration: 12000,
                }
            );
        }, 1000);
        console.log(error);
    },
    onSuccess: () => {
      // Recharger la liste apres l'operation
      queryClient.invalidateQueries("entrant");
    }
  });

  const handleArrived = (escale) => {

    // Soustraire la longueur dispo du quai par la longueur du navire
    escale.longueurDispo -= escale.longueursNav;

    toast.promise(
      mutation.mutateAsync(escale),
      {
        loading: "chargement...",
        success: "Navire amaré",
        error: "Une erreur est survenue"
      }
    );
  }

  // Recuperation des donnée à afficher
  const fetchData = async () => {
    const reponse = await axios.get("http://localhost:8081/escale/getLateEntrant");
    return reponse.data;
  }
  const {isPending, isError, data:escales = [], error} = useQuery({
      queryKey: ['entrant'],
      queryFn: fetchData
  });

  if (isPending) {
    return <p>chargement de la liste...</p>  
  }

  if (isError) {
    console.log(error);
    return <p>Une erreur s'est produit</p>
  }

  if (escales.length == 0) {
    return <p> Aucun navire en retard </p>
  }

  return ( 
    <ScrollableContainer>
        {escales.map((escale, index) => (
            <Accordion key={index}>
                <AccordionSummary aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                    <Typography>{escale.nomNav}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>N° Escale : {escale.numEscale}</Typography>
                    <Typography>Code navire : {escale.numNav}</Typography>
                    <Typography>Longueur : {escale.longueursNav} m</Typography>
                    <Typography>Quai attribué : {escale.nomQuai}</Typography>
                    <Typography>Arrivée estimée : {escale.heureArrivEst}</Typography>
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
                            onClick={() => handleArrived(escale)}
                        >
                            Arriver
                        </Button>
                    </ButtonContainer>
                </AccordionDetails>
            </Accordion>
        ))}
    </ScrollableContainer>
  );
}

export default RetardEntrant;