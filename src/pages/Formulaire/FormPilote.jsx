import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const FormPilote = () => {
    const {handleSubmit, control, reset, formState:{errors}} = useForm();

    const mutation = useMutation({
        mutationFn: async (data) => {
            await axios.post("http://localhost:8081/pilote/add", data);
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

    const onSubmit = (data) => {
        toast.promise(
            mutation.mutateAsync(data),
            {
                loading: "chargement...",
                success: "Pilote ajouté",
                error: "Pilote non ajouté"
            }
        )
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
                <Avatar sx={{ m: 1, bgcolor: '#3fc8ff' }}/>
                <Typography component="h1" variant="h5">
                    Pilote
                </Typography>
                <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
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
                                            error={!!errors.nomPiloter}
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
                                            error={!!errors.emailPilote}
                                            helperText={errors.emailPilote ? errors.emailPilote.message : ""}
                                        />
                                    )}
                                />
                            </Grid>
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

export default FormPilote;