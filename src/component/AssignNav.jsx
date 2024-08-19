import { Box, Button, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

/************** FETCH LIST ***************/
const fetchNavires = async () => {
    const reponse = await axios.get("http://localhost:8081/navire/getAllLibre");
    /* console.log(reponse.data); */
    return reponse.data;
}

const AssignNav = ({quai}) => {

    /***************  STATES *****************/
    // Liste de tous les navires et Quais
    const [listeNav, setListeNav] = useState([]);

    /**************** USEFORM *****************/
    const {handleSubmit, control, reset, formState: {errors}} = useForm();

    // Liste navires
    const {isPending, isError, data:navires = []} = useQuery({
        queryKey: ['navLibre'],
        queryFn: fetchNavires
    });

    /************** USE EFFECT **************/
    // navire
    useEffect(() => {
        if (navires) {
            setListeNav(navires);
        }
    }, [navires]);

    /**** QUERYCLIENT (actualisation de la liste) ****/
    const queryClient = useQueryClient();

    // envoie de requete au serveur
    const mutation = useMutation({

        mutationFn: async ({idQuai , longueurDispo, idNav}) => {

        // Reduire la longueur disponible
        await axios.post("http://localhost:8081/quai/update/changeLongDispo", {idQuai, longueurDispo});

        // Amarrer le navire
        await axios.post("http://localhost:8081/navire/update/changeSituation", {idNav, situationNav: "Amarré"});

        // Associer le quai avec le navire
        await axios.post("http://localhost:8081/changement/add", {idNav, idQuai, typeChange: "affectation"})
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
        queryClient.invalidateQueries("quai");
        }
    });

    const onSubmit = (data) => {
        // OBJET NAVIRE ET QUAI selectionné
        const selectedNavire = listeNav.find(navire => navire.id === data.idNav);

        quai.longueurDispo -= selectedNavire.longueur;

        const {idQuai , longueurDispo} = quai;
        const {id} = selectedNavire;
        
        toast.promise(
            mutation.mutateAsync({idQuai , longueurDispo, idNav: id}),
            {
              loading: "chargement...",
              success: "Navire affecté",
              error: "Une erreur est survenue"
            }
        );
    }

    /************ RENDER DROP OPTION *************/
    const renderOptions = () => {

        if (isPending) {
            return [<MenuItem key="loading" value="" disabled>Chargement...</MenuItem>];
        }

        if (isError) {
            return [<MenuItem key="error" value="" disabled>Erreur de chargement</MenuItem>];
        }

        return navires.map((navire) => (
            <MenuItem key={navire.id} value={navire.id}>{navire.nomNav}</MenuItem>
        ));
    }


    return (
        <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Navire</InputLabel>
            <Controller
                name="idNav"
                control={control}
                defaultValue=""
                rules={{ required: "Ce champ est requis" }}
                render={({ field }) => (
                    <>
                        <Select
                            {...field}
                            id="idNav"
                            label="Navire"
                            fullWidth
                            size='small'
                            error={!!errors.idNav}
                        >
                            
                            {
                                /* Affichages de la liste des navires */
                                renderOptions()
                            }

                        </Select>
                        {errors.idNav && (
                            <FormHelperText error>{errors.idNav.message}</FormHelperText>
                        )}
                    </>
                )}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#3fc8ff"}}
            >
                Affecter
            </Button>
        </Box>
    );
};

export default AssignNav;