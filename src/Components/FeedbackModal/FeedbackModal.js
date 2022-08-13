import './FeedbackModal.css';
import React from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useSnackbar } from 'notistack';
import MainContext from '../../context';

import { uploadPrediction } from '../../Services';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Muy mal',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Mal',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Regular',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Bueno',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Muy bueno',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

function RadioGroupRating({ setRating, rating }) {
  return (
    <StyledRating
      name="highlight-selected-only"
      defaultValue={rating}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => setRating(customIcons[value].label)}
      highlightSelectedOnly
    />
  );
}

function FeedbackModal({ handleClose, downloadFile }) {
  const mainContext = React.useContext(MainContext);
  const { user } = mainContext;
  const { enqueueSnackbar } = useSnackbar();
  const [rating, setRating] = React.useState(3);
  const [loadingFeed, setLoadingFeed] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoadingFeed(true);
    data.rating = rating;
    data = { ...data, ...downloadFile, user: user.email };
    console.log(data);
    return uploadPrediction(data)
      .then(() => {
        enqueueSnackbar('Gracias por tu feedback', { variant: 'success' });
        setLoadingFeed(false);
        setTimeout(() => handleClose(), 3000);
      })
      .catch((error) => {
        setLoadingFeed(false);
        console.log(error);
      });
  };

  return (
    <>
      <DialogTitle>¡Déjanos tus comentarios!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Es importante conocer la calidad del modelo, con esta
          retroalimentación podremos mejorarlo para que pueda ser más eficiente
          para ti.
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
            {...register('comment', { required: true })}
          />

          <Grid align="center" style={{ marginTop: '20px' }}>
            <Typography style={{ textAlign: 'start', marginBottom: '10px' }}>
              Calificación de la segmentación
            </Typography>
            <RadioGroupRating setRating={setRating} rating={rating} />
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton loading={loadingFeed} type="submit" onClick={handleSubmit(onSubmit)}>
          Enviar
        </LoadingButton>
      </DialogActions>
    </>
  );
}

export default FeedbackModal;
