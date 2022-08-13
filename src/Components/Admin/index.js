import React from 'react';
import MUIDataTable from 'mui-datatables';

import { Grid } from '@mui/material';
import { getTableData } from '../../Services'

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

//const data = [[5, 'Feo el proto', 'url del archivo', 'Eduardo']];

const options = {
  filterType: 'checkbox',
  print: false,
  viewColumns: false,
};

const Admin = () => {

  const [dataTable, setDataTable] = React.useState([]);

  React.useEffect(() => {
    if (!dataTable.length) {
      console.log('Admin: useEffect');
      getTableData()
        .then(docs => {
          console.log(docs);
          setDataTable(docs);
        })
        .catch(error => {
          console.log(error);
        });
    }
    return;
  });

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" className='admin-grid'>
      <MUIDataTable
        className="admin-table"
        title="Retroalimentación de usuarios"
        data={dataTable}
        columns={columns}
        options={options}
      />
    </Grid>
  );
};

export default Admin;
