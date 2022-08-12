import './PreviewCard.css';
import React, { useState } from 'react'
import Button from '@mui/material/Button';


function PreviewCard(props) {


  // Con los files
  const acceptedFileItems = props.files.map(file => (
    <li key={file.path}>
      {file.name} - {file.size} bytes
    </li>
  ));

  console.log(props.files)

  return (
    <div className="img-preview-card">
      <div>
        <p style={{textAlign: 'center', margin: '0'}}>Preview</p>
        {/* <div className="img-preview">images</div> */}
        <div className="img-preview">
          <div>
            {
              props.files.map((file, idx) => (
                <div key={file.path}>
                  {file.name} - {file.size} bytes
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="segment-button">
        <Button variant="outlined" onClick={props.lowerCardSwitcher}>Segmentar</Button>
      </div>
    </div> 
  )

}

export default PreviewCard;


