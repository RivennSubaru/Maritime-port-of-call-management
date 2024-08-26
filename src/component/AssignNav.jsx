import { Box, Button, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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

        mutationFn: async ({idQuai, idNav, typeChange, dateChange}) => {

        // Amarrer le navire
        await axios.post("http://localhost:8081/navire/update/changeSituation", {idNav, situationNav: "Amarré"});

        // Associer le quai avec le navire
        await axios.post("http://localhost:8081/changement/add", {idNav, idQuai, typeChange, dateChange})
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
        reset([]);
        }
    });

    const onSubmit = (data) => {
        // OBJET NAVIRE ET QUAI selectionné
        const selectedNavire = listeNav.find(navire => navire.id === data.idNav);

        const {idQuai} = quai;
        const {id} = selectedNavire;
        
        toast.promise(
            mutation.mutateAsync({idQuai, idNav: id, typeChange: data.typeChange, dateChange: data.dateChange}),
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
            <Grid container spacing={2}>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={6}>
                    <InputLabel id="demo-simple-select-label">Origine de l'affectation</InputLabel>
                    <Controller
                        name="typeChange"
                        defaultValue=''
                        control={control}
                        rules={{ required: "Ce champ est requis" }}
                        render={({ field }) => (
                            <>
                                <Select
                                    {...field}
                                    id="typeChange"
                                    fullWidth
                                    size='small'
                                    error={!!errors.typeChange}
                                >
                                    <MenuItem value="Escale">Escale</MenuItem>
                                    <MenuItem value="Simple Affectation">Simple affectation</MenuItem>
                                </Select>
                                {errors.typeChange && (
                                    <FormHelperText error>{errors.typeChange.message}</FormHelperText>
                                )}
                            </>
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name='dateChange'
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    {...field}
                                    label="Date de l'affectation"
                                    sx={{width: "100%"}}
                                    textField={(params) => <TextField {...params}/>}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Grid>
            </Grid>
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