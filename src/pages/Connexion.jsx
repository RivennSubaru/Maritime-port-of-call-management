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
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Port-Toamasina
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const Connexion = () => {
    const {handleSubmit, register, formState:{errors}} = useForm();
    
    const navigateTo = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("userMail")) {
            navigateTo("/");
        }
    })

    // Envoi de requete au serveur
    const mutation = useMutation({
        mutationFn: async (user) => {
            try {
                const response = await axios.post("http://localhost:8081/user/login", user);
                return response;
            } catch (error) {
                // Envoie l'erreur pour que onError puisse le recevoir
                throw error.response;
            }
        },
        onError: (error) => {
            // Gestion des erreur
            if (error.status === 401) {
                toast.error("Email ou mot de passe invalide");
            } else if (error.status === 500) {
                toast.error("Une erreur est survenue sur le serveur");
            } else {
                toast(
                    "Il semble que vous rencontriez un probleme à part.\n\n Le probleme peut venir d'une mauvaise connexion.\nVeuillez réessayer plus tard.",
                    {
                      duration: 12000,
                    }
                );
            }
            console.log(error);
        },
        onSuccess: (res) => {
            // Recuperation de l'email depuis res.config.data qui est encore un string
            const userEmail = JSON.parse(res.config.data).emailUser;
            localStorage.setItem("userMail", JSON.stringify(userEmail));

            navigateTo('/');
            setTimeout(() => {
                toast('Bienvenue !', {
                    icon: '👋',
                });
            }, 1000);
        }
    });

    const onSubmit = (data) => {
        toast.promise(
            mutation.mutateAsync(data),
            {
                loading: 'Chargement...',
                success: 'Vous êtes connecté',
                error: 'Connexion échouée'
            }
           );
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Connexion
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse email"
                        autoFocus
                        type='email'
                        {...register("emailUser", {required: "Ce champ ne peut être vide", pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/})}
                        error={!!errors.emailUser}
                        helperText={errors.emailUser ? errors.emailUser.message : ""}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Mot de passe"
                        type="password"
                        id="password"
                        {...register("password", {required: "Ce champ ne peut être vide", minLength: {value: 6, message: "mot de passe doit au moins contenir 6 caractère"}})}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ""}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Se connecter
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Mot de passe oublié?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/inscription" variant="body2">
                            {"Pas encore de compte? S'inscrire"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

export default Connexion;