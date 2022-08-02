import './ResultsView.css';
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FeedbackModal from '../FeedbackModal/FeedbackModal';

function ResultsView(props) {
  // const [open, setOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="results-card">
        <div className="img-container">
          <div className="img-card">
            Original
            <img 
              src="./images/OriginalImg.png" 
              alt="image" 
            />
          </div>
          <div className="img-card">
            Result
            <img 
              src="./images/SegmentedImg.png" 
              alt="image" 
            />
          </div>
        </div>
        <div className="button-container">
          <Button color='success' variant='outlined'>Download</Button>
          <Button variant='outlined' onClick={props.setView}>Upload another file</Button>
          <Button onClick={handleOpen} color='error' variant='outlined'>Leave feedback</Button>
        </div>

      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FeedbackModal />

      </Modal>
    </>

  )

}

export default ResultsView
