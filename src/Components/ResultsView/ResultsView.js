import './ResultsView.css';
import React, { useState } from 'react'
import Button from '@mui/material/Button';

function ResultsView(props) {

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
          <Button color='error' variant='outlined'>Leave feedback</Button>
        </div>
      </div>
    </>

  )

}

export default ResultsView
