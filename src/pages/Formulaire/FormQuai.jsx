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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

const FormQuai = ({initialValues, handleClose}) => {
    const {handleSubmit, control, setValue, reset, formState: {errors}} = useForm();

    // Pour actualiser automatiquement la liste
    const queryClient = useQueryClient();

    // envoie de requete au serveur
    const mutation = useMutation({

        // update ou add en fonction des cas
        mutationFn: async (quai) => {
            if (initialValues)
                await axios.post("http://localhost:8081/quai/update", quai);
            else
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
        },
        onSuccess: () => {
            // Recharger la liste apres ajout ou modification
            queryClient.invalidateQueries("quais");
            reset([]);

            // Fermer la fenetre 
            handleClose();
        }
    })

    // Soumission du formulaire
    const onSubmit = (data) => {
        toast.promise(
            mutation.mutateAsync(data),
            {
                loading: "chargement...",
                success: initialValues ?  "Quai modifié" : "Quai ajouté",
                error: "Quai non ajouté"
            }
        )
    }

    // Preremplissage du formulaire
    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
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
                    <AnchorIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {initialValues ? 'Modifier un quai' : 'Ajouter un quai'}
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
                                name='longueursQuai'
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
                        {initialValues ? 'Modifier' : 'Ajouter'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default FormQuai;