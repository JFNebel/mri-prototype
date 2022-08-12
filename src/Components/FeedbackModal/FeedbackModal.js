import './FeedbackModal.css';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useForm } from 'react-hook-form';
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
      defaultValue={3}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value].label}
      highlightSelectedOnly
    />
  );
}

function FeedbackModal({ handleClose }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <>
      <DialogTitle>¡Déjanos tus comentarios!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Es importante conocer la calidad del modelo, con esta retroalimentación podremos mejorarlo para que pueda ser más eficiente para ti.
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)} className="form-content">
          <TextField
            label="Comentario"
            variant="outlined"
            multiline
            fullWidth
            rows={4}
            error={errors.comentario}
            helperText={errors.comentario && 'El comentario es obligatorio'}
            inputProps={{
              style: {
                height: '110px',
              },
            }}
            style={{ marginTop: '20px' }}
            {...register('comentario', { required: true })}
          />

          <Grid align="center" style={{ marginTop: '20px' }}>
            <Typography
              style={{ textAlign: 'start', marginBottom: '10px' }}
            >
              Calificación de la segmentación
            </Typography>
            <RadioGroupRating />
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Enviar
          </Button>
      </DialogActions>
    </>
  );
}

export default FeedbackModal;
