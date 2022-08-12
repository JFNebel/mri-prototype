import './DropZoneT2.css';
import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone';
import Button from '@mui/material/Button';
import { sendFile } from '../../Services';
import PreviewCard from '../PreviewCard/PreviewCard';
import ResultsCard from '../ResultsCard/ResultsCard';

function DropZoneT2(props) {
  const [files, setFiles] = useState([]);
  const [previewView, setPreviewView] = useState();
  const [resultsView, setResultsView] = useState();
  const [predFile, setPredFile] = useState();

  const onDrop = useCallback(acceptedFiles => {
    // Lógica de lower cards
    setPreviewView(true)
    setResultsView(false)
    
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

  // Dummy segmenter
  const segmenter = () => {
    // Card logic
    setPreviewView(false)
    setResultsView(true);
  }

  return (
    <>
      <div  
        className="dropzone-outer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="dropzone">
          {
            isDragActive ?
              <p>Arrastra el archivo aquí T2</p> :
              <p>
              Arrastra el archivo T2 que deseas subir en este recuadro 
              <br/><br/>o<br/><br/> 
              Haz click aquí para buscarlo entre tus carpetas.
              </p>
          }
        </div>
      </div>

      {/* Preview component */}
      {previewView && <PreviewCard segmenter={segmenter}/>}

      {/* Result component */}
      {resultsView && <ResultsCard />}

    </>
  )
}

export default DropZoneT2
