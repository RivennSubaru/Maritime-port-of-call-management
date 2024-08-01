import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import { FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, InputLabel, FormHelperText } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


// Recupération de la liste de type de navire
const fetchTypes = async () => {
    const reponse = await axios.get("http://localhost:8081/type/getAll");
    return reponse.data;
}
// Recupération de la liste des pilotes
const fetchPilote = async () => {
    const reponse = await axios.get("http://localhost:8081/pilote/getAll");
    return reponse.data;
}

const FormNavire = ({initialValues}) => {

    // Useform gestion du formulaire
    const { handleSubmit, control, setValue, reset, watch, formState: { errors } } = useForm();

    const [type, setType] = useState(''); /* type */
    const [piloteName, setPiloteName] = useState(''); /* Nom pilote */
    const [isNewPilote, setIsNewPilote] = useState('non'); /* formulaire pilote */

    // Pour actualiser automatiquement la liste
    const queryClient = useQueryClient();

    /* const navigateTo = useNavigate(); */

    // Usequery pour fetch les listes
    const fetchQuery = (fetchData, key) => {

        const {isPending, isError, data = [], error} = useQuery({
            queryKey: [key],
            queryFn: fetchData,
        });

        return {isPending, isError, data, error}
    }

    // Afficher la liste des type dans la liste déroulante
    const afficheListeTypes = () => {

        // Recuperation des données des types
        const {isPending, isError, data: types} = fetchQuery(fetchTypes, "types")

        if (isPending) {
            return [<MenuItem key="loading" value="" disabled>Chargement...</MenuItem>];
        }
    
        if (isError) {
            return [<MenuItem key="error" value="" disabled>Erreur de chargement</MenuItem>];
        }
    
        return types.map((type) => (
            <MenuItem key={type.idType} value={type.idType}>{type.labelType}</MenuItem>
        ));
    };
    // Afficher la liste des pilotes
    const afficheListePilotes = () => {

        const {isPending, isError, data: pilotes} = fetchQuery(fetchPilote, "pilotes")

        if (isPending) {
            return [<MenuItem key="loading" value="" disabled>Chargement...</MenuItem>];
        }
    
        if (isError) {
            return [<MenuItem key="error" value="" disabled>Erreur de chargement</MenuItem>];
        }
    
        return pilotes.map((pilote) => (
            <MenuItem key={pilote.idPilote} value={pilote.idPilote}>{pilote.nomPilote + ' ' + pilote.prenomPilote}</MenuItem>
        ));
    };


    // Changement dynamique de l'idType du navire en fonction du labelType
    const handleNavireChange = (event) => {
        setType(event.target.value);
        setValue('type', event.target.value);
        setValue('idType', event.target.value);
    };

    // Changement dynamique de l'idPilote en fonction du nom du pilote
    const handlePiloteChange = (event) => {
        setPiloteName(event.target.value);
        setValue('piloteName', event.target.value);
        setValue('idPilote', event.target.value);
    };

    // Gestion de l'affichage de la formulaire spéciale pilote
    const handleRadioChange = (event) => {
        setIsNewPilote(event.target.value);
        setPiloteName("");
        setValue('piloteName', "");
        setValue('idPilote', "");
    };



    // Envoie de donnée au serveur
    const mutation = useMutation({
        mutationFn: async (data) => {
            if (initialValues) {
                await axios.post("http://localhost:8081/navire/update", data);
                /* console.log(data); */

            } else if (data.idPilote) {
                await axios.post("http://localhost:8081/navire/add", data);
                /* console.log("navire fotsiny") */

            } else if (data.nomPilote){
                await axios.post("http://localhost:8081/pilote/add", data);
                /* console.log("pilote puis...") */

            } else {
                await axios.post("http://localhost:8081/navire/addSousRequete", data);
                /* console.log("enfin navire"); */
            }
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
            queryClient.invalidateQueries("navire");
        }
    })

    // lors de la soumissions du formulaire
    const onSubmit = async (data) => {
        const toastId = toast.loading("Chargement...");

        try {

            if (data.idPilote != "") {
                toast.loading("Enregistrement du navire...", { id: toastId });

                /* await new Promise((resolve) => setTimeout(resolve, 2000)); */
    
                await mutation.mutateAsync(data);
    
            } else {

                const {nomNav, numNav, idType, tirantEau, longueur, nomPilote, prenomPilote, telPilote, emailPilote} = await data;
    
                const pilote = {nomPilote, prenomPilote, telPilote, emailPilote};
                const navire = {nomNav, numNav, idType, tirantEau, longueur, telPilote};
    
                toast.loading("Enregistrement du pilote...", { id: toastId });
                /* await new Promise((resolve) => setTimeout(resolve, 2000)); */
                await mutation.mutateAsync(pilote);

                toast.loading("Enregistrement du navire...", { id: toastId });
                /* await new Promise((resolve) => setTimeout(resolve, 2000)); */
                await mutation.mutateAsync(navire);
            }
            
            toast.success( initialValues ? "Navire modifié" : "Navire ajouté" , { id: toastId })

        } catch (error) {
            toast.error("Une erreur est survenu", { id: toastId });

        }

        reset([]);
        setType('');
        setPiloteName('');
        setIsNewPilote('non');
        
        // Ne pas rediriger s'il s'agit d'une modification
        /* if (!initialValues) navigateTo("/navire"); */
    };

    // Preremplissage du formulaire
    useEffect(() => {
        if (initialValues) {
            reset(initialValues);

            // pour type
            setType(initialValues.idType || '');
            setValue('idType', initialValues.idType);
            setValue('type', initialValues.type);

            // pour pilote
            setPiloteName(initialValues.idPilote || '');
            setValue('piloteName', initialValues.nomPilote);
            setValue('idPilote', initialValues.idPilote);
        }
    }, [initialValues, reset]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: '#3fc8ff' }}>
                    <DirectionsBoatIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {initialValues ? 'Modifier un navire' : 'Ajouter un navire'}
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="nomNav"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Ce champ est requis" }}

                                // render pour passer les attributs de gest form (onChange...) dans le composant TextField
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        autoFocus
                                        id="nomNav"
                                        label="Nom du navire"
                                        size='small'
                                        error={!!errors.nomNav}
                                        helperText={errors.nomNav ? errors.nomNav.message : ""}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="numNav"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Ce champ est requis" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        id="numNav"
                                        label="Numéros du navire"
                                        size='small'
                                        error={!!errors.numNav}
                                        helperText={errors.numNav ? errors.numNav.message : ""}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} gap={2} sx={{ display: "flex", alignItems: "flex-end", flexDirection: "row-reverse" }}>
                            <Grid item xs={1.7} sm={1.7}>
                                <Controller
                                    name="idType"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Ce champ est requis" }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            autoFocus
                                            id="idType"
                                            label="ID"
                                            size='small'
                                            value={type}
                                            disabled
                                            error={!!errors.idType}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <InputLabel id="demo-simple-select-label">Type du bateau</InputLabel>
                                <Controller
                                    name="type"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Ce champ est requis" }}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                {...field}
                                                id="typeNav"
                                                value={type}
                                                label="Type navire"
                                                onChange={handleNavireChange}
                                                fullWidth
                                                size='small'
                                                error={!!errors.type}
                                            >
                                                
                                                {
                                                    /* Affichages de la liste des types */
                                                    afficheListeTypes() 
                                                }

                                            </Select>
                                            {errors.type && (
                                                <FormHelperText error>{errors.type.message}</FormHelperText>
                                            )}
                                        </>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="tirantEau"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Ce champ est requis" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        autoFocus
                                        id="tirantEau"
                                        type='number'
                                        label="Tirant d'eau (m)"
                                        size='small'
                                        error={!!errors.tirantEau}
                                        helperText={errors.tirantEau ? errors.tirantEau.message : ""}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="longueur"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Ce champ est requis" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        autoFocus
                                        id="longueur"
                                        type="number"
                                        label="Longueur du navire (m)"
                                        size='small'
                                        error={!!errors.longueur}
                                        helperText={errors.longueur ? errors.longueur.message : ""}
                                    />
                                )}
                            />
                        </Grid>
                        {!initialValues && (
                            <>
                                <Grid item sx={{ paddingTop: "25px !important", width: "100%" }}>
                                    <Typography component="h1" variant="h5" width={"100%"}>
                                        Pilote
                                    </Typography>
                                </Grid>
                                <Grid item gap={2} sx={{ display: "flex", alignItems: "center", paddingTop: "1px !important" }}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Nouveau pilote ?</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={isNewPilote}
                                        onChange={handleRadioChange}
                                    >
                                        <FormControlLabel value="non" control={<Radio />} label="Non" />
                                        <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                                    </RadioGroup>
                                </Grid>
                            </>
                        )}


                        {(isNewPilote === 'non' || initialValues) && (
                            <Grid item xs={12} gap={2} sx={{ display: "flex", alignItems: "flex-end", flexDirection: "row-reverse" }}>
                                <Grid item xs={1.7} sm={1.7}>
                                    <Controller
                                        name="idPilote"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Ce champ est requis" }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                autoFocus
                                                id="idPilote"
                                                label="ID"
                                                size='small'
                                                value={piloteName}
                                                disabled
                                                error={!!errors.idPilote}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <InputLabel id="demo-simple-select-label">Nom du pilote</InputLabel>
                                    <Controller
                                        name="piloteName"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Ce champ est requis" }}
                                        render={({ field }) => (
                                            <>
                                                <Select
                                                    {...field}
                                                    id="nomPilote"
                                                    value={piloteName}
                                                    label="Nom pilote"
                                                    onChange={handlePiloteChange}
                                                    fullWidth
                                                    size='small'
                                                    error={!!errors.piloteName}
                                                >
                                                    
                                                    {
                                                        // Affichage de la liste des pilotes
                                                        afficheListePilotes()
                                                    }

                                                </Select>
                                                {errors.piloteName && (
                                                    <FormHelperText error>{errors.piloteName.message}</FormHelperText>
                                                )}
                                            </>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        )}

                        {/* S'IL S'AGIT D'UN NOUVEAU PILOTE */}

                        {(isNewPilote === 'oui' && !initialValues) && (

                            <Grid item gap={2} sx={{ display: "flex", flexWrap: "wrap" }}>
                                <Grid item xs={12} sm={5.75}>
                                    <Controller
                                        name="nomPilote"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Ce champ est requis" }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                autoFocus
                                                id="nomPilote"
                                                label="Nom du pilote"
                                                size='small'
                                                error={!!errors.nomPilote}
                                                helperText={errors.nomPilote ? errors.nomPilote.message : ""}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5.75}>
                                    <Controller
                                        name="prenomPilote"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Ce champ est requis" }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                id="prenomPilote"
                                                label="Prénom du pilote"
                                                size='small'
                                                error={!!errors.prenomPilote}
                                                helperText={errors.prenomPilote ? errors.prenomPilote.message : ""}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="telPilote"
                                        control={control}
                                        defaultValue=""
                                        rules={{ 
                                                required: "Ce champ est requis",
                                                pattern: {
                                                    value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                                                    message: "Format incorrect"
                                                }
                                            }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                id="telPilote"
                                                label="Téléphone du pilote"
                                                size='small'
                                                error={!!errors.telPilote}
                                                helperText={errors.telPilote ? errors.telPilote.message : ""}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="emailPilote"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Ce champ est requis" }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                id="emailPilote"
                                                label="Adresse email du pilote"
                                                type="email"
                                                size='small'
                                                error={!!errors.emailPilote}
                                                helperText={errors.emailPilote ? errors.emailPilote.message : ""}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: "#3fc8ff" }}
                    >
                        {initialValues ? 'Modifier' : 'Ajouter'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default FormNavire;
