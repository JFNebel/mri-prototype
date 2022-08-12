import './LogIn.css';
import React from 'react';
import { useForm } from "react-hook-form";
import LoginIcon from '@mui/icons-material/Login';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';

function LogIn(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Aquí se mandan credenciales al auth module del backend
    console.log(data);
    props.logInSubmit();
  }


  return (
    <Grid>
      <Paper className='log-in-card' elevation={10} >

        <Grid align="center">
          <div className="log-in-card-content">
            <h2>Segmentador STN</h2>
            <Avatar 
              className='avatar-symbol' 
              variant='rounded'
              sx={{ width: 45, height: 45 }} 
            >
              <LoginIcon />
            </Avatar>
            <h3 style={{ paddingTop: '10px'}}>Log In</h3>
          </div>
        </Grid>


        <form onSubmit={handleSubmit(onSubmit)} className='login-form'>

          <TextField 
            focused 
            label="Usuario" 
            className='login-input user-input'
            // variant="standard" 
            inputProps={{ 
              style: { 
                color: "white",
                fontFamily: 'Inter',
                fontWeight: 'bold',
                fontSize: '12px',
              } 
            }} 
            {...register("correo", {required: true})}
          />

          <TextField 
            focused 
            label="Contraseña" 
            className='login-input password-input'
            type='password'
            // variant="standard" 
            inputProps={{ 
              style: { 
                color: "white",
                fontFamily: 'Inter',
                fontWeight: 'bold',
                fontSize: '12px'
              } 
            }} 
            {...register("feedback", {required: true})}
          />

          {/* Manejo de errores para required fields */}
          {errors.exampleRequired && <span>This field is required</span>}

          <Button className='submit-btn' type='submit' variant="outlined" fullWidth>Ingresar</Button>

        </form>

      </Paper>
    </Grid>
  )
}

export default LogIn;
