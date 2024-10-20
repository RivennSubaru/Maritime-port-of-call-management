import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
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
      <Link color="inherit" href="http://www.toamasina-port.com/">
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
        if (localStorage.getItem("pseudo")) {
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
                toast.error("Pseudo ou mot de passe invalide");
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
            // Récupération du token JWT depuis la réponse
            const token = res.data.token;
            const pseudo = res.data.pseudo;
            const role = res.data.role;

            // Stockage des informations utilisateur et du token
            localStorage.setItem("token", token);
            localStorage.setItem("pseudo", pseudo);
            localStorage.setItem("role", role);

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
                <p style={{margin: 0}}>
                    <img alt='logo spat' style={{margin: 0, width: "250px"}} src='../../pictures/logo_spat png.png'/>
                </p>
                {/* <Typography component="h1" variant="h5">
                    Connexion
                </Typography> */}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
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
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

export default Connexion;