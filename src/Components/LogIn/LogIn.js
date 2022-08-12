import './LogIn.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import LoginIcon from '@mui/icons-material/Login';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';

function LogIn(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    props.logInSubmit();
  };

  return (
    <Grid>
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
            label="Usuario"
            className="login-input user-input"
            {...register('correo', { required: true })}
          />

          <TextField
            fullWidth
            label="Contraseña"
            className="login-input password-input"
            type="password"
            // variant="standard"
            {...register('feedback', { required: true })}
          />

          {/* Manejo de errores para required fields */}
          {errors.exampleRequired && <span>This field is required</span>}

          <Button
            className="submit-btn"
            type="submit"
            variant="outlined"
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
