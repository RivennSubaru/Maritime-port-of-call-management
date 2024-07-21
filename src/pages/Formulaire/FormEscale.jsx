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
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const fetchNavires = async () => {
    const reponse = await axios.get("http://localhost:8081/navire/getAllParti");
    /* console.log(reponse.data); */
    return reponse.data;
}

const FormEscale = ({ initialValues }) => {
    const {handleSubmit, control, watch, setValue, reset, formState: {errors}} = useForm();

    // id du navire
    const [idNav, setIdNav] = useState("");
    // numeros de l'escale
    const [numEscale, setNumEscale] = useState("DateNumber");

    const handleDateChange = (date) => {
        if (date) {
            const formattedDate = formatDate(date);
            updateNumEscale("date", formattedDate);
        }
    };

    const updateNumEscale = (type, value) => {
        setNumEscale((prevNumEscale) => {
            let newNumEscale = prevNumEscale;
            if (type === "num") {
                newNumEscale = newNumEscale.replace(/Number/, value);
            } else if (type === "date") {
                newNumEscale = newNumEscale.replace(/Date/, value);
            }
            setValue("numEscale", newNumEscale);
            return newNumEscale;
        });
    };
    
    const handleNavireChange = (event) => {
        const selectedNavire = event.target.value;

        setIdNav(selectedNavire.id);
        setValue("idNav", selectedNavire.id);
        setValue("nomNavire", selectedNavire.id);
        updateNumEscale("num", selectedNavire.numNav);
    }

    const formatDate = (date) => {
        const year = date.year();
        const month = date.month() + 1; // Months are 0-indexed in dayjs
        const formattedDate = `${year.toString().slice(-2)}${year}${month.toString().padStart(2, '0')}00${month.toString().padStart(2, '0')}`;
        return formattedDate;
    };

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
            <MenuItem key={navire.id} value={navire}>{navire.nomNav}</MenuItem>
        ));
    }

    // Preremplissage du formulaire
    useEffect(() => {
        if (initialValues) {

            if(initialValues.provenance === 'quai') {
                const {emplacementQuai, id, idTypeQuai, longueurDispo, longueursQuai, nom, profondeurQuai, type, isFull} = initialValues;
                const donneesQuai = {idQuai: id, nomQuai: nom, idTypeQuai, typeQuai: type, emplacementQuai,profondeurQuai, longueursQuai, longueurDispo};

                console.log(donneesQuai);

                reset(donneesQuai);
            } else if (initialValues.provenance === 'navire') {
                const {id, idNavigateur, idType, longueur, nomNav, nomNavigateur, numNav, situationNav, tirantEau, type} = initialValues;
                const donneesNavire = {idNav: id, nomNav, numNav, idNavigateur, nomNavigateur,  idTypeNav: idType, typeNav: type, situationNav, longueur, tirantEau}

                console.log(donneesNavire);
            }
        }
    }, [initialValues, reset]);

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
                                defaultValue=""

                                render={({ field} ) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        autoFocus
                                        id="numEscale"
                                        label="Numeros escale"
                                        value={numEscale}
                                        disabled
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='idQuai'
                                control={control}
                                defaultValue=""

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
                                defaultValue=""

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
                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-label">Type d'escale</InputLabel>
                            <Controller
                                name="typeEscale"
                                control={control}
                                defaultValue={(initialValues.provenance === 'quai') ? 'Entrant' : 'Sortant'}
                                rules={{ required: "Ce champ est requis" }}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            {...field}
                                            id="typeEscale"
                                            fullWidth
                                            disabled
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

                        { /* L'ELEMENT CI-DESOUS NE DEVRAIT APPARAITRE QUE SI LE FORMULAIRE EST OUVERT A PARTIR DE LA LISTE DES QUAIS */

                            (initialValues.provenance === 'quai') &&(
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
                                                    onChange={handleNavireChange}
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
                            )

                         /* L'ELEMENT CI-DESSUS NE DEVRAIT APPARAITRE QUE SI LE FORMULAIRE EST OUVERT A PARTIR DE LA LISTE DES QUAIS */
                        }

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
                                            onChange={(date) => {
                                                field.onChange(date);
                                                handleDateChange(date);
                                            }}
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