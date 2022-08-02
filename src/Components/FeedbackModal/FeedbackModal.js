import './FeedbackModal.css';
import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import { Input } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/base/TextareaAutosize';

function FeedbackModal(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <>
      <div className="modal-box">
        <h1 className="form-header">¡Envíanos tu feedback!</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='form-content'>
          <TextField 
            size="small" 
            id="outlined-basic" 
            className='correo-input'
            label="Correo" 
            variant="outlined" 
            {...register("correo", {required: true})}
          />
          
          {/* include validation with required or other standard HTML validation rules */}
          <TextField 
            id="outlined-basic" 
            label="Comentario" 
            variant="outlined" 
            multiline
            style={{width: '80%'}}
            {...register("feedback", {required: true})}
          />

          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}
          
          {/* <input type="submit" /> */}
          {/* <Input type="submit" /> */}
          <Button type='submit' variant="contained" endIcon={<SendIcon />}>
            Enviar
          </Button>
        </form>

      </div>
    </>
  )

}

export default FeedbackModal
