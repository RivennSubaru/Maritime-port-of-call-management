import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AnchorIcon from '@mui/icons-material/Anchor';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';

// Recupération de la liste de type de navire
const fetchTypes = async () => {
    const reponse = await axios.get("http://localhost:8081/type/getAll");
    return reponse.data;
}

const FormQuai = () => {
    const {handleSubmit, control, setValue, reset,  formState: {errors}} = useForm();

    const [type, setType] = useState('');

    const mutation = useMutation({
        mutationFn: async (quai) => {
            await axios.post("http://localhost:8081/quai/add", quai);
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

    const handleQuaiChange = (event) => {
        setType(event.target.value);
        setValue('type', event.target.value);
        setValue('idType', event.target.value);
    }

    const onSubmit = (data) => {
        toast.promise(
            mutation.mutateAsync(data),
            {
                loading: "chargement...",
                success: "Quai ajouté",
                error: "Quai non ajouté"
            }
        )
    }


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
                    <AnchorIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Ajouter un quai
                </Typography>
                <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='nomQuai'
                                control={control}
                                defaultValue=""
                                rules={{required: "Ce champ ne peut être vide"}}

                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        autoFocus
                                        id="nomQuai"
                                        label="Nom du quai"
                                        error={!!errors.nomQuai}
                                        helperText={errors.nomQuai ? errors.nomQuai.message : ""}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='emplacementQuai'
                                control={control}
                                defaultValue=""
                                rules={{required: "Ce champ ne peut être vide"}}

                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        id="emplacement"
                                        label="Emplacement"
                                        error={!!errors.emplacementQuai}
                                        helperText={errors.emplacementQuai ? errors.emplacementQuai.message : ""}
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
                                <InputLabel id="demo-simple-select-label">Type du quai</InputLabel>
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
                                            onChange={handleQuaiChange}
                                            fullWidth
                                            error={!!errors.type}
                                            helperText={errors.type ? errors.type.message : ""}
                                        >
                                            
                                            {
                                                /* Affichages de la liste des types */
                                                afficheListeTypes() 
                                            }

                                        </Select>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name='profondeurQuai'
                                control={control}
                                defaultValue=""
                                rules={{required: "Ce champ ne peut être vide"}}

                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        id="float"
                                        type='number'
                                        label="Profondeur (m)"
                                        error={!!errors.profondeurQuai}
                                        helperText={errors.profondeurQuai ? errors.profondeurQuai.message : ""}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name='longueurQuai'
                                control={control}
                                defaultValue=""
                                rules={{required: "Ce champ ne peut être vide"}}

                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        required
                                        fullWidth
                                        id="float"
                                        type='number'
                                        label="Longueur (m)"
                                        error={!!errors.longueurQuai}
                                        helperText={errors.longueurQuai ? errors.longueurQuai.message : ""}
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

export default FormQuai;