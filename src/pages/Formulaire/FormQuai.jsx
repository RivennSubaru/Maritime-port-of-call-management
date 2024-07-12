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
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const FormQuai = () => {
    const {handleSubmit, register, formState: {errors}} = useForm();

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
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                id="nomQuai"
                                label="Nom du quai"
                                {...register("nomQuai", {required: "Ce champ ne peut être vide"})}
                                error={!!errors.nomQuai}
                                helperText={errors.nomQuai ? errors.nomQuai.message : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="emplacement"
                                label="Emplacement"
                                {...register("emplacementQuai", {required: "Ce champ ne peut être vide"})}
                                error={!!errors.emplacementQuai}
                                helperText={errors.emplacementQuai ? errors.emplacementQuai.message : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                id="float"
                                type='number'
                                label="Profondeur (m)"
                                {...register("profondeurQuai", {required: "Ce champ ne peut être vide"})}
                                error={!!errors.profondeurQuai}
                                helperText={errors.profondeurQuai ? errors.profondeurQuai.message : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                autoFocus
                                id="float"
                                type='number'
                                label="Longueur (m)"
                                {...register("longueurQuai", {required: "Ce champ ne peut être vide"})}
                                error={!!errors.longueurQuai}
                                helperText={errors.longueurQuai ? errors.longueurQuai.message : ""}
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