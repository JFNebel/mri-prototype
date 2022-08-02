import './DropZone.css';
import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone';
import Button from '@mui/material/Button';
import { sendFile } from '../../Services';

function DropZone(props) {
  const [files, setFiles] = useState([]);
  const [predFile, setPredFile] = useState();

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
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

  const segmenter = () => {
    const [ file ] = files;
    sendFile({ file })
      .then((data) => setPredFile(data))
      .catch(error => console.log(error));
  }

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
              <Button variant="outlined" onClick={segmenter}>Segment!</Button>
            </div>
          </div> :
          <></>
      }
      {
        predFile &&
          <div className="download-button">
            <Button variant="outlined" onClick={() => {
              const url = URL.createObjectURL(predFile.blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = predFile.filename;
              link.click();
            }
            }>Descargar</Button>
          </div>
      }
    </>
  )
}

export default DropZone
