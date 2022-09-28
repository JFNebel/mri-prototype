import './ResultsCard.css';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import FeedbackModal from '../FeedbackModal';


function ResultsCard({ downloadFile, setFiles, setDownloadFile }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='results-card'>
      <div className="button-container">
        <Button
          color='success'
          variant='outlined'
          onClick={() => {
            //encodeURI
            const { filename, href } = downloadFile;
            const link = document.createElement('a');
            link.href = href;
            link.download = filename;
            link.click();
          }}
        >
          Descargar resultados
        </Button>
        <Button onClick={handleOpen} color='info' variant='outlined'>Dejar comentario</Button>
        <Button onClick={() => {
          setFiles([]);
          setDownloadFile();
        }} color='info' variant='outlined'>Nueva segmentación</Button>
      </div>
        <Dialog open={open} onClose={handleClose}>
        <FeedbackModal handleClose={handleClose} downloadFile={downloadFile} />
      </Dialog>
    </div>
  )
}

export default ResultsCard
