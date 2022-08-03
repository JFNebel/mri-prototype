import './PreviewCard.css';
import React, { useState } from 'react'
import Button from '@mui/material/Button';

function PreviewCard(props) {

  return (
    <div className="img-preview-card">
      <div>
        <p style={{textAlign: 'center', margin: '0'}}>Preview</p>
        <div className="img-preview">images</div>
      </div>
      <div className="segment-button">
        <Button variant="outlined" onClick={props.segmenter}>Segment!</Button>
      </div>
    </div> 
  )

}

export default PreviewCard;


