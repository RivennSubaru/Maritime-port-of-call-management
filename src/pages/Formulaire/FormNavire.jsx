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
import { FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, InputLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const FormNavire = () => {
    const { handleSubmit, control, setValue, reset, watch, formState: { errors } } = useForm();

    const [type, setType] = useState('');
    const [navigName, setNavigName] = useState('');
    const [isNewNavigator, setIsNewNavigator] = useState('non');

    const handleNavireChange = (event) => {
        setType(event.target.value);
        setValue('type', event.target.value);
        setValue('idType', event.target.value);
    };

    const handleNavigateurChange = (event) => {
        setNavigName(event.target.value);
        setValue('navigName', event.target.value);
        setValue('idNavig', event.target.value);
    };

    const handleRadioChange = (event) => {
        setIsNewNavigator(event.target.value);
    };

    // Envoie de donnée au serveur
    const mutation = useMutation({
        mutationFn: async (data) => {
            if (data.idNavig) {
                await axios.post("http://localhost:8081/navire/add", data);
                /* console.log("navire fotsiny") */

            } else if (data.nomNavigateur){
                await axios.post("http://localhost:8081/navigateur/add", data);
                /* console.log("navigateur puis...") */

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
        }
    })

    const onSubmit = async (data) => {
        const toastId = toast.loading("Chargement...");

        try {

            if (data.idNavig != "") {
                const {nomNav, numNav, idType, tirantEau, longueur, idNavig} = data;
                const navire = {nomNav, numNav, idType, tirantEau, longueur, idNavig};
    
                toast.loading("Enregistrement du navire...", { id: toastId });
    
                await new Promise((resolve) => setTimeout(resolve, 2000));
    
                await mutation.mutateAsync(navire);
    
            } else {

                const {nomNav, numNav, idType, tirantEau, longueur, nomNavigateur, prenomNavigateur, telNavigateur, emailNavigateur} = await data;
    
                const navigateur = {nomNavigateur, prenomNavigateur, telNavigateur, emailNavigateur};
                const navire = {nomNav, numNav, idType, tirantEau, longueur, telNavigateur};
    
                toast.loading("Enregistrement du navigateur...", { id: toastId });
                /* await new Promise((resolve) => setTimeout(resolve, 2000)); */
                await mutation.mutateAsync(navigateur);

                toast.loading("Enregistrement du navire...", { id: toastId });
                /* await new Promise((resolve) => setTimeout(resolve, 2000)); */
                await mutation.mutateAsync(navire);
            }
            
            toast.success("Ajouté", { id: toastId })

        } catch (error) {
            toast.error("Une erreur est survenu", { id: toastId });

        }
        /* toast.success("Navire et navigateur ajoutés", { id: toastId }); */

        reset();
        setType('');
        setNavigName('');
        setIsNewNavigator('non')
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: '#3fc8ff' }}>
                    <DirectionsBoatIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Ajouter un navire
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="nomNav"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Ce champ est requis" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        autoFocus
                                        id="nomNav"
                                        label="Nom du navire"
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
                                        <Select
                                            {...field}
                                            id="typeNav"
                                            value={type}
                                            label="Type navire"
                                            onChange={handleNavireChange}
                                            fullWidth
                                            error={!!errors.type}
                                            helperText={errors.type ? errors.type.message : ""}
                                        >
                                            <MenuItem value={0}>Conteneur</MenuItem>
                                            <MenuItem value={1}>Matière première</MenuItem>
                                            <MenuItem value={2}>Passager</MenuItem>
                                        </Select>
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
                                        error={!!errors.longueur}
                                        helperText={errors.longueur ? errors.longueur.message : ""}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item sx={{ paddingTop: "25px !important" }}>
                            <Typography component="h1" variant="h5" width={"100%"}>
                                Navigateur
                            </Typography>
                        </Grid>
                        <Grid item gap={2} sx={{ display: "flex", alignItems: "center" }}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Nouveau navigateur ?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={isNewNavigator}
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value="non" control={<Radio />} label="Non" />
                                <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                            </RadioGroup>
                        </Grid>
                        {isNewNavigator === 'non' && (
                            <Grid item xs={12} gap={2} sx={{ display: "flex", alignItems: "flex-end", flexDirection: "row-reverse" }}>
                                <Grid item xs={1.7} sm={1.7}>
                                    <Controller
                                        name="idNavig"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Ce champ est requis" }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                autoFocus
                                                id="idNavig"
                                                label="ID"
                                                value={navigName}
                                                disabled
                                                error={!!errors.idNavig}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <InputLabel id="demo-simple-select-label">Nom du navigateur</InputLabel>
                                    <Controller
                                        name="navigName"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Ce champ est requis" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                id="nomNavig"
                                                value={navigName}
                                                label="Nom navigateur"
                                                onChange={handleNavigateurChange}
                                                fullWidth
                                                error={!!errors.navigName}
                                                helperText={errors.navigName ? errors.navigName.message : ""}
                                            >
                                                <MenuItem value={0}>Mrs Bob</MenuItem>
                                                <MenuItem value={1}>Mrs Kristopher</MenuItem>
                                                <MenuItem value={2}>Mrs Boto</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        )}

                        {/* S'IL S'AGIT D'UN NOUVEAU NAVIGATEUR */}

                        {isNewNavigator === 'oui' && (

                            <Grid item gap={2} sx={{ display: "flex", flexWrap: "wrap" }}>
                                <Grid item xs={12} sm={5.75}>
                                    <Controller
                                        name="nomNavigateur"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Ce champ est requis" }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                autoFocus
                                                id="nomNavigateur"
                                                label="Nom du navigateur"
                                                error={!!errors.nomNavigateur}
                                                helperText={errors.nomNavigateur ? errors.nomNavigateur.message : ""}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5.75}>
                                    <Controller
                                        name="prenomNavigateur"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Ce champ est requis" }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                id="prenomNavigateur"
                                                label="Prénom du navigateur"
                                                error={!!errors.prenomNavigateur}
                                                helperText={errors.prenomNavigateur ? errors.prenomNavigateur.message : ""}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="telNavigateur"
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
                                                id="telNavigateur"
                                                label="Téléphone du navigateur"
                                                error={!!errors.telNavigateur}
                                                helperText={errors.telNavigateur ? errors.telNavigateur.message : ""}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="emailNavigateur"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Ce champ est requis" }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                id="emailNavigateur"
                                                label="Adresse email du navigateur"
                                                type="email"
                                                error={!!errors.emailNavigateur}
                                                helperText={errors.emailNavigateur ? errors.emailNavigateur.message : ""}
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
                        Ajouter
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default FormNavire;
