import './DropZone.css';
import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone';
import Button from '@mui/material/Button';

function DropZone(props) {
  const [files, setFiles] = useState([]);
  console.log(props)

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setFiles(
      acceptedFiles.map(file => Object.assign(file,{
        preview:URL.createObjectURL(file)
      }))
    )
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple: false
  })

  const images = files.map(file => (
    <img 
      key={file.name} 
      src={file.preview} 
      alt="image" 
      style={{ maxWidth:'200px', maxHeight:'200px', margin: '3px' }} 
    />
  ))




  return (
    <>
      <div {...getRootProps()} 
        className="dropzone-outer"
      >
        <input {...getInputProps()} />
        <div className="dropzone">
          {
            isDragActive ?
              <p>Suelta el archivo aquí</p> :
              <p>
              Coloca la imagen que deseas subir en este recuadro 
              <br/><br/>o<br/><br/> 
              Haz click aquí para buscarlo entre tus archivos.
              </p>
          }

        </div>

      </div>

      {
        files.length > 0 ? 
          <div className="img-preview-card">
            <div>
              <p style={{textAlign: 'center', margin: '0'}}>Preview</p>
              <div className="img-preview">{images}</div>
            </div>
            <div className="segment-button">
              <Button variant="outlined" onClick={props.setView}>Segment!</Button>
            </div>
          </div> :
          <></>
      }


    </>

  )

}

export default DropZone
