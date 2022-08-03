import './ResultsCard.css';
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FeedbackModal from '../FeedbackModal/FeedbackModal';

function ResultsCard(props) {
  const [open, setOpen] = useState(false);
  // const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='results-card'>
      <div className="button-container">
        <Button color='success' variant='outlined'>Download</Button>
        <Button onClick={handleOpen} color='error' variant='outlined'>Leave feedback</Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FeedbackModal />
      </Modal>
    </div>

  )

}

export default ResultsCard
