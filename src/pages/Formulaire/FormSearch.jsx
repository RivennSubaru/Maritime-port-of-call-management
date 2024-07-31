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

const FormSearch = () => {
    const {handleSubmit, control, reset, formState:{errors}} = useForm();

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
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item gap={2} sx={{ display: "flex", flexWrap: "wrap" }}>
                            <Grid item xs={12} sm={5.75}>
                                <Controller
                                    name="numNav"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Ce champ est requis" }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            autoFocus
                                            id="numNav"
                                            label="Code du navire"
                                            error={!!errors.numNav}
                                            helperText={errors.numNav ? errors.numNav.message : ""}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5.75}>
                                <Controller
                                    name="nomNav"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Ce champ est requis" }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            id="nomNav"
                                            label="Nom du navire"
                                            error={!!errors.nomNav}
                                            helperText={errors.nomNav ? errors.nomNav.message : ""}
                                        />
                                    )}
                                />
                            </Grid>
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
                                            id="nomPilote"
                                            label="Nom du Pilote"
                                            error={!!errors.nomPilote}
                                            helperText={errors.nomPilote ? errors.nomPilote.message : ""}
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

export default FormSearch;