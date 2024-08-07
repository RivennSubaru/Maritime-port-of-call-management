import { Avatar, Box, Button, Chip, Container, CssBaseline, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SailingIcon from '@mui/icons-material/Sailing';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import { toast } from 'react-hot-toast';

/************** FETCH LIST ***************/
const fetchNavires = async () => {
    const reponse = await axios.get("http://localhost:8081/navire/getAllParti");
    /* console.log(reponse.data); */
    return reponse.data;
}
const fetchQuai = async () => {
    
    const reponse = await axios.get("http://localhost:8081/quai/getAll");
    /* console.log(reponse.data); */
    return reponse.data;
}


/************ RENDER DROP OPTION *************/
const renderOptions = (data, isLoading, isError, ITEM) => {
    if (isLoading) {
        return [<MenuItem key="loading" value="" disabled>Chargement...</MenuItem>];
    }

    if (isError) {
        return [<MenuItem key="error" value="" disabled>Erreur de chargement</MenuItem>];
    }

    return data.map((item) => (
        <MenuItem key={item.id} value={item.id}>{ITEM == 'navire' ? item.nomNav : item.nom}</MenuItem>
    ));
}

/************** FORMATAGE DATE **************/
const formatDate = (date) => {
    const year = date.year();
    const month = date.month() + 1; // Months are 0-indexed in dayjs
    const formattedDate = `${year.toString().slice(-2)}${year}${month.toString().padStart(2, '0')}00${month.toString().padStart(2, '0')}`;
    return formattedDate;
};

const FormEscaleClone = () => {

    /***************  STATES *****************/
    // Liste de tous les navires et Quais
    const [listeNav, setListeNav] = useState([]);
    const [listeQuais, setListeQuais] = useState([]);

    
    /**************** USEFORM *****************/
    const {handleSubmit, control, watch, setValue, reset, formState: {errors}} = useForm();

    /**** QUERYCLIENT (actualisation de la liste) ****/
    const queryClient = useQueryClient();

    // envoie de requete au serveur
    const mutation = useMutation({

        // update ou add en fonction des cas
        mutationFn: async (escale) => {
            await axios.post("http://localhost:8081/escale/add", escale);
            /* console.log(escale); */
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
            // Recharger la liste apres ajout ou modification
            /* queryClient.invalidateQueries("escale"); */
            reset([]);
        }
    })

    
    /*************** SOUMISSION ***************/
    const onSubmit = (data) => {

        // OBJET NAVIRE ET QUAI selectionné
        const selectedNavire = listeNav.find(navire => navire.id === data.idNav);
        const selectedQuai = listeQuais.find(quai => quai.id === data.idQuai);

        // FORMATAGE NUMEROS D'ESCALE
            // Code Date de départ
            const codeDate = formatDate(data.ETD);

            // Code du navire
            const numNavire = selectedNavire ? selectedNavire.numNav : '';

            // Code numeros escale
            const numEscale = codeDate + '' + numNavire;
            
        // INSERTION DU NUM ESCALE DANS LE DATA
        data = {...data, numEscale};
        
        // MAJ DES DATES AVEC LE BON FORMAT
        data.ETD = dayjs(data.ETD).format('YYYY-MM-DD HH:mm:ss');
        data.ETA = dayjs(data.ETA).format('YYYY-MM-DD HH:mm:ss');

        // logique pour soumettre au serveur les données
        toast.promise(
            mutation.mutateAsync(data),
            {
                loading: "chargement...",
                success: "Escale créé",
                error: "Création d'escale échoué"
            }
        )
    }


    /**************** QUERIES ***************/
    // Liste navires
    const naviresQuery = useQuery({
        queryKey: ['navires'],
        queryFn: fetchNavires
    });

    // Liste quai
    const quaisQuery = useQuery({
        queryKey: ['quais'],
        queryFn: fetchQuai
    });



    /************** USE EFFECT **************/
    // navire
    useEffect(() => {
        if (naviresQuery.data) {
            setListeNav(naviresQuery.data);
        }
    }, [naviresQuery.data]);

    // quai
    useEffect(() => {
        if (quaisQuery.data) {
            setListeQuais(quaisQuery.data);
        }
    }, [quaisQuery.data]);
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#3fc8ff' }}>
                    <SailingIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Escale
                </Typography>
                <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-label">Quai</InputLabel>
                            <Controller
                                name="idQuai"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Ce champ est requis" }}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            {...field}
                                            id="idQuai"
                                            label="Quai"
                                            fullWidth
                                            size='small'
                                            error={!!errors.idQuai}
                                        >
                                            
                                            {
                                                /* Affichages de la liste des quais */
                                                renderOptions(listeQuais, quaisQuery.isLoading, quaisQuery.isError, 'quai')
                                            }

                                        </Select>
                                        {errors.idQuai && (
                                            <FormHelperText error>{errors.idQuai.message}</FormHelperText>
                                        )}
                                    </>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                                                renderOptions(listeNav, naviresQuery.isLoading, naviresQuery.isError, 'navire')
                                            }

                                        </Select>
                                        {errors.idNav && (
                                            <FormHelperText error>{errors.idNav.message}</FormHelperText>
                                        )}
                                    </>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-label">type de Mouvement</InputLabel>
                            <Controller
                                name="typeMouvement"
                                defaultValue=''
                                control={control}
                                rules={{ required: "Ce champ est requis" }}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            {...field}
                                            id="typeMouvement"
                                            fullWidth
                                            size='small'
                                            error={!!errors.typeMouvement}
                                        >
                                            <MenuItem value="Entrant">Entrant</MenuItem>
                                            <MenuItem value="Sortant">Sortant</MenuItem>
                                        </Select>
                                        {errors.typeMouvement && (
                                            <FormHelperText error>{errors.typeMouvement.message}</FormHelperText>
                                        )}
                                    </>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='ETD'
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            {...field}
                                            label="Départ estimé(ETD)"
                                            textField={(params) => <TextField {...params}/>}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='ETA'
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            {...field}
                                            label="Arrivé estimé(ETA)"
                                            textField={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='provenance'
                                control={control}
                                defaultValue=''
                                rules={{required: "Ce champ ne peut être vide"}}

                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        autoFocus
                                        id="provenance"
                                        label="Provenance"
                                        size='small'
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='destination'
                                control={control}
                                defaultValue=''
                                rules={{required: "Ce champ ne peut être vide"}}

                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        autoFocus
                                        id="destination"
                                        label="Déstination"
                                        size='small'
                                    />
                                )}
                            />
                        </Grid>
                        <Divider variant="middle" sx={{ width: '96%', my: 3 }}>
                            <Chip label="A l'arrivée" size="small" />
                        </Divider>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='ATD'
                                control={control}
                                defaultValue={null}
                                disabled
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            {...field}
                                            label="Départ effectif(ATD)"
                                            textField={(params) => <TextField {...params}/>}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='ATA'
                                control={control}
                                defaultValue={null}
                                disabled
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            {...field}
                                            label="Arrivé effectif(ATA)"
                                            textField={(params) => <TextField {...params} />}
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
                        Ajouter
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default FormEscaleClone;