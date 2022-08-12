import './FeedbackModal.css';
import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import { Input, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';


const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));


const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}


function RadioGroupRating() {
  return (
    <StyledRating
      name="highlight-selected-only"
      defaultValue={2}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value].label}
      highlightSelectedOnly
    />
  );
}


function FeedbackModal(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  // console.log(watch("example")); // watch input value by passing the name of it
  



  return (
    <>
      <div className="modal-box">
        <h1 className="form-header">¡Déjanos tus comentarios!</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='form-content'>
          {/* Aquí tiene que ir la calificación */}

          {/* <TextField */} 
          {/*   focused */} 
          {/*   size="small" */} 
          {/*   id="outlined-basic" */} 
          {/*   className='correo-input' */}
          {/*   label="Correo" */} 
          {/*   variant="outlined" */} 
          {/*   inputProps={{ */} 
          {/*     style: { */} 
          {/*       color: "white", */}
          {/*       fontFamily: 'Inter', */}
          {/*       fontWeight: 'bold', */}
          {/*       fontSize: '12px', */}
          {/*     } */} 
          {/*   }} */} 
          {/*   {...register("correo", {required: true})} */}
          {/* /> */}

          {/* include validation with required or other standard HTML validation rules */}
          <TextField 
            focused 
            id="outlined-basic" 
            label="Comentario" 
            variant="outlined" 
            multiline
            fullWidth
            inputProps={{ 
              style: { 
                color: "white",
                fontFamily: 'Inter',
                fontWeight: 'bold',
                fontSize: '12px',
                height: '110px',
              } 
            }} 
            {...register("comentario", {required: true})}
          />

          {errors.exampleRequired && <span>This field is required</span>}
          

          <Grid align='center' style={{marginTop: '7px'}}>
            <Typography 
              component="legend" 
              style={{
                color: 'white', 
                fontWeight: 'bold', 
                fontFamily: 'Inter', 
                marginBottom: '5px'
              }}
            >
              Calificación de la segmentación
            </Typography>
            <RadioGroupRating />
          </Grid>


          <Button 
            type='submit' 
            variant="outlined" 
            endIcon={<SendIcon />}
            style={{marginTop: '10px'}}
          >
            Enviar
          </Button>
        </form>

      </div>
    </>
  )

}

export default FeedbackModal
