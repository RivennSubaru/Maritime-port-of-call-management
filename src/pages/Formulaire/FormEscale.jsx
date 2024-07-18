import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SailingIcon from '@mui/icons-material/Sailing';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { renderTimeViewClock } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchNavires = async () => {
    const reponse = await axios.get("http://localhost:8081/navire/getAll");
    console.log(reponse.data);
    return reponse.data;
}

const FormEscale = () => {
    const {handleSubmit, control, setValue, reset, formState: {errors}} = useForm();

    const [idNav, setIdNav] = useState("");

    
    const handleChange = (event) => {
        setIdNav(event.target.value);
        setValue("idNav", event.target.value);
        setValue("nomNavire", event.target.value);
    }
    const onSubmit = (data) => {
        data.dateDep = dayjs(data.dateDep).format('YYYY-MM-DD HH:mm:ss');
        data.dateArriv = dayjs(data.dateArriv).format('YYYY-MM-DD HH:mm:ss');

        const {numEscale, idQuai, idNav, typeEscale, dateDep, dateArriv, provenance, destination} = data;

        const dataNavire = {numEscale, idQuai, idNav, typeEscale, dateDep, dateArriv, provenance, destination};
        console.log(dataNavire);
    }

    const afficheListeNavires = () => {
        const {isPending, isError, data: navires = [], error} = useQuery({
            queryKey: ['navire'],
            queryFn: fetchNavires,
        });

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
                            <Controller
                                name='numEscale'
                                control={control}
                                defaultValue="1"
                                rules={{required: "Ce champ ne peut être vide"}}

                                render={({ field} ) => (
                                    <TextField
                                        {...field}
                                        type='number'
                                        required
                                        fullWidth
                                        autoFocus
                                        id="numEscale"
                                        label="Numeros escale"
                                        disabled
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='idQuai'
                                control={control}
                                defaultValue="1"
                                rules={{required: "Ce champ ne peut être vide"}}

                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='number'
                                        required
                                        fullWidth
                                        autoFocus
                                        id="idQuai"
                                        label="ID Quai"
                                        disabled
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='idNav'
                                control={control}
                                /* defaultValue="1" */
                                rules={{required: "Ce champ ne peut être vide"}}

                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='number'
                                        required
                                        fullWidth
                                        autoFocus
                                        id="idNav"
                                        label="ID Navire"
                                        value={idNav}
                                        disabled
                                    />
                                )}
                            />
                        </Grid>

                        {/* L'ELEMENT CI-DESOUS NE DEVRAIT APPARAITRE QUE SI LE FORMULAIRE EST OUVERT A PARTIR DE LA LISTE DES QUAIS */}
                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-label">Navire</InputLabel>
                            <Controller
                                name="nomNavire"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Ce champ est requis" }}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            {...field}
                                            id="nomNavire"
                                            label="Nom navire"
                                            onChange={handleChange}
                                            fullWidth
                                            value={idNav}
                                            error={!!errors.nomNavire}
                                        >
                                            
                                            {
                                                /* Affichages de la liste de navire */
                                                afficheListeNavires() 
                                            }

                                        </Select>
                                        {errors.nomNavire && (
                                            <FormHelperText error>{errors.nomNavire.message}</FormHelperText>
                                        )}
                                    </>
                                )}
                            />
                        </Grid>
                        {/* L'ELEMENT CI-DESSUS NE DEVRAIT APPARAITRE QUE SI LE FORMULAIRE EST OUVERT A PARTIR DE LA LISTE DES QUAIS */}

                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-label">Type d'escale</InputLabel>
                            <Controller
                                name="typeEscale"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Ce champ est requis" }}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            {...field}
                                            id="typeEscale"
                                            fullWidth
                                            error={!!errors.typeNav}
                                        >
                                            <MenuItem value="Entrant">Entrant</MenuItem>
                                            <MenuItem value="Sortant">Sortant</MenuItem>
                                        </Select>
                                        {errors.typeEscale && (
                                            <FormHelperText error>{errors.typeEscale.message}</FormHelperText>
                                        )}
                                    </>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='dateDep'
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            {...field}
                                            label="Date de départ"
                                            textField={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='dateArriv'
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            {...field}
                                            label="Date d'arrivée"
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
                                    />
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
}

export default FormEscale;