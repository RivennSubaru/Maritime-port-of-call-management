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

const FormNavire = () => {
    const { handleSubmit, control, setValue, reset, watch } = useForm();

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

    const onSubmit = (data) => {
        if (data.idNavig != "") {
            const {nomNav, numNav, idType, tirantEau, longueur, idNavig} = data;
            const navire = {nomNav, numNav, idType, tirantEau, longueur, idNavig};

            console.log(navire);
        } else {
            const {nomNav, numNav, idType, tirantEau, longueur, nomNavigateur, prenomNavigateur, telNavigateur, emailNavigateur} = data;

            const navire = {nomNav, numNav, idType, tirantEau, longueur};
            const navigateur = {nomNavigateur, prenomNavigateur, telNavigateur, emailNavigateur};

            console.log({...navire, ...navigateur});
        }

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
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        autoFocus
                                        id="nomNav"
                                        label="Nom du navire"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="numNav"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        id="numNav"
                                        label="Numeros du navire"
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
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            id="typeNav"
                                            value={type}
                                            label="Type navire"
                                            onChange={handleNavireChange}
                                            fullWidth
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
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        autoFocus
                                        id="tirantEau"
                                        type='number'
                                        label="Tirant d'eau (m)"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="longueur"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        autoFocus
                                        id="longueur"
                                        type="number"
                                        label="Longueur du navire (m)"
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
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                id="nomNavig"
                                                value={navigName}
                                                label="Nom navigateur"
                                                onChange={handleNavigateurChange}
                                                fullWidth
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
                        {isNewNavigator === 'oui' && (
                            <Grid item gap={2} sx={{ display: "flex", flexWrap: "wrap" }}>
                                <Grid item xs={12} sm={5.75}>
                                    <Controller
                                        name="nomNavigateur"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                autoFocus
                                                id="nomNavigateur"
                                                label="Nom du navigateur"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5.75}>
                                    <Controller
                                        name="prenomNavigateur"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                id="prenomNavigateur"
                                                label="Prénom du navigateur"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="telNavigateur"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                id="telNavigateur"
                                                label="Téléphone du navigateur"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="emailNavigateur"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                id="emailNavigateur"
                                                label="Adresse email du navigateur"
                                                type="email"
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
