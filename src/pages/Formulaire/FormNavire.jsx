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
import { FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import { useState } from 'react';

const FormNavire = () => {
    /* STATES */
    // Type navire
    const [type, setType] = useState('');
    const [idType, setIdType] = useState('');

    // Navigateur
    const [navigName, setNavigName] = useState('');
    const [IdNavig, setIdNavig] = useState('');

    // Radio navigateur
    const [isNewNavigator, setIsNewNavigator] = useState('non');


    /* HANDLECHANGE */
    // Gestion de l'affichage du type du navire sélectionné
    const handleNavireChange = (event) => {
        setType(event.target.value);
        setIdType(event.target.value);
    }

    // Ajout de l'id du navigateur automatiquement
    const handleNavigateurChange = (event) => {
        setNavigName(event.target.value);
        setIdNavig(event.target.value);
    }

    // Affichage des sections d'ajout du navigateur
    const handleRadioChange = (event) => {
        setIsNewNavigator(event.target.value);
    }

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
                    <DirectionsBoatIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Ajouter un navire
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                id="nomNav"
                                label="Nom du navire"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="numNav"
                                label="Numeros du navire"
                            />
                        </Grid>
                        {/* Mettre dans un seul div flex le type du bateau avec l'id qui vas avec */}
                        <Grid item xs={12} gap={2} sx={{display: "flex", alignItems: "flex-end", flexDirection: "row-reverse"}}>
                            <Grid item xs={1.7} sm={1.7}>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    id="idType"
                                    label="ID"
                                    value={idType}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <InputLabel id="demo-simple-select-label">Type du bateau</InputLabel>
                                <Select
                                    id="typeNav"
                                    value={type}
                                    label="Type navire"
                                    onChange={handleNavireChange}
                                    fullWidth
                                >
                                    <MenuItem value={0}>Conteneur</MenuItem>
                                    <MenuItem value={1}>Matière premiere</MenuItem>
                                    <MenuItem value={2}>Passager</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                id="float"
                                label="Tyrant d'eau (m)"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                id="float"
                                type='number'
                                label="Longueur du navire (m)"
                            />
                        </Grid>

                        <Grid item sx={{paddingTop: "25px !important"}}>
                            <Typography component="h1" variant="h5" width={"100%"}>
                                Navigateur
                            </Typography>
                        </Grid>

                        <Grid item gap={2} sx={{display: "flex", alignItems: "center"}}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Nouveau navigateur ?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                defaultValue='non'
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value="non" control={<Radio />} label="Non" />
                                <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                            </RadioGroup>
                        </Grid>

                        {/* A CONDITIONNER */}
                        {isNewNavigator === 'non' && (
                            <Grid item xs={12} gap={2} sx={{display: "flex", alignItems: "flex-end", flexDirection: "row-reverse"}}>
                                <Grid item xs={1.7} sm={1.7}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoFocus
                                        id="idNavig"
                                        label="ID"
                                        value={IdNavig}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <InputLabel id="demo-simple-select-label">Nom du navigateur</InputLabel>
                                    <Select
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
                                </Grid>
                            </Grid>
                        )}

                        {/* SI OUI */}
                        {isNewNavigator === 'oui' && (
                            <Grid item gap={2} sx={{display: "flex", flexWrap: "wrap"}}>
                                <Grid item xs={12} sm={5.75}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoFocus
                                        id="nomNav"
                                        label="Nom du navigateur"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5.75}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="numNav"
                                        label="Prénom du navigateur"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="telNav"
                                        label="Téléphone du navigateur"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="emailNav"
                                        label="Addresse email du navigateur"
                                        type='email'
                                    />
                                </Grid>
                            </Grid>
                        )}

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: "#3fc8ff"}}
                    >
                        Ajouter
                    </Button>
                    {/* <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/connexion" variant="body2">
                            Vous avez déja un compte? Se connecter
                            </Link>
                        </Grid>
                    </Grid> */}
                </Box>
            </Box>
        </Container>
    );
}

export default FormNavire;