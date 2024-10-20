import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://www.toamasina-port.com/">
        Port-toamasina
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Inscription = () => {
    const {handleSubmit, register, formState: {errors}} = useForm();
    
    // Envoie des informations au serveur
    const mutation = useMutation({
        mutationFn: async (user) => {
            await axios.post("http://localhost:8081/user/inscription", user);
        },
        onError: (error) => {
            toast(
                "Il semble que vous rencontriez un probleme.\n\n Le probleme peut venir soit de la connexion au serveur soit de la base de donnée ou une mauvaise connexion.\nVeuillez réessayer plus tard.",
                {
                  duration: 12000,
                }
              );
            console.log(error);
        }
    })

    const onSubmit = (data) => {
        if (data.password !== data.confPassword) {
            toast.error("Les mots de passes ne correspondent pas");

        } else {
            const {pseudo, password} = data;
            const dataCopy = {pseudo, password};

            toast.promise(
                mutation.mutateAsync(dataCopy),
                {
                    loading: 'Chargement...',
                    success: 'Inscription réussie',
                    error: 'Inscription échouée'
                }
            )
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Inscription
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="pseudo"
                        label="Nom d'utilisateur"
                        autoComplete="family-name"
                        {...register("pseudo", {required: "Ce champ ne peut être vide"})}
                        error={!!errors.pseudo}
                        helperText={errors.pseudo ? errors.pseudo.message : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        {...register("password", {required: "Ce champ ne peut être vide", minLength: {value: 6, message: "mot de passe doit au moins contenir 6 caractère"}})}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="confPassword"
                        label="Confirmer mot de passe"
                        type="password"
                        id="confPassword"
                        autoComplete="current-password"
                        {...register("confPassword", {required: "Ce champ ne peut être vide", minLength: {value: 6, message: "mot de passe doit au moins contenir 6 caractère"}})}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ""}
                    />
                </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Inscrire
                </Button>
            </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}

export default Inscription;