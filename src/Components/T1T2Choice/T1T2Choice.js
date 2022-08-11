import './T1T2Choice.css';
import React from 'react';
import { useForm } from "react-hook-form";
import LoginIcon from '@mui/icons-material/Login';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';

function T1T2Choice(props) {

  return (
    <div className="t1-t2-card">
      <h3 className="title">
        Elige el tipo de radiografía a subir
      </h3>
    </div>
  )

}

export default T1T2Choice;
