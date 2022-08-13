import './LogIn.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import LoginIcon from '@mui/icons-material/Login';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import {
  useNavigate,
} from "react-router-dom";

import { login } from '../../Services';

import { useSnackbar } from 'notistack';

function LogIn(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    return login(data)
      .then((user) => {
        navigate(user.admin ? '/admin' : '/segmenter');
      })
      .catch((_) => {
        enqueueSnackbar('Credenciales no válidas', { variant: 'error' });
      });
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Paper className="log-in-card" elevation={10}>
        <Grid align="center">
          <div className="log-in-card-content">
            <h2>Segmentador STN</h2>
            <Avatar
              className="avatar-symbol"
              variant="rounded"
              sx={{ width: 45, height: 45 }}
            >
              <LoginIcon />
            </Avatar>
            <h3 style={{ paddingTop: '10px' }}>Inicio de sesión</h3>
          </div>
        </Grid>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <TextField
            fullWidth
            label="Correo"
            className="login-input user-input"
            error={errors.email}
            helperText={errors.email && 'La dirección de correo es requerida'}
            {...register('email', { required: true })}
          />
          <TextField
            fullWidth
            label="Contraseña"
            className="login-input password-input"
            type="password"
            error={errors.password}
            helperText={errors.password && 'La contraseña es requerida'}
            {...register('password', { required: true })}
          />
          <Button
            className="submit-btn"
            type="submit"
            variant="contained"
            fullWidth
          >
            Ingresar
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default LogIn;
