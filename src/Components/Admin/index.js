import React from 'react';
import MUIDataTable from 'mui-datatables';

import { Grid } from '@mui/material';

import './admin.css'

const columns = [
  {
    name: 'Calificación',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'Comentario',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'Segmentación',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'Usuario',
    options: {
      filter: true,
      sort: true,
    },
  },
];

const data = [[5, 'Feo el proto', 'url del archivo', 'Eduardo']];

const options = {
  filterType: 'checkbox',
  print: false,
  viewColumns: false,
};

const Admin = () => {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <MUIDataTable
        className="admin-table"
        title="Retroalimentación de usuarios"
        data={data}
        columns={columns}
        options={options}
      />
    </Grid>
  );
};

export default Admin;
