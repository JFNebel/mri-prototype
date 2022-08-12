import './DropZone.css';
import {useDropzone} from 'react-dropzone';
import React, { useCallback, useState } from 'react'
import PreviewCard from '../PreviewCard/PreviewCard';
import ResultsCard from '../ResultsCard/ResultsCard';


function DropZone() {
  const [files, setFiles] = useState([]);
  const [previewView, setPreviewView] = useState();
  const [resultsView, setResultsView] = useState();

  // Do que ocurre cuando dropeo algo en el DropZone.
  const onDrop = useCallback(acceptedFiles => {
    setPreviewView(true)
    setResultsView(false)
    setFiles((files) => [...files, acceptedFiles].flat()) // Actualizo arreglo de files
  }, [])


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 2,
    disabled: files.length >= 2
    // multiple: false,
  })


  // Dummy view switcher
  const lowerCardSwitcher = () => {
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
              <p>Arrastra un archivo T1 y T2 aquí</p> :
              <p>
              Arrastra archivos T1 y T2
              <br/><br/>o<br/><br/> 
              Haz click aquí para buscarlos entre tus carpetas.
              </p>
          }
        </div>
      </div>

      {/* Preview component */}
      {previewView && <PreviewCard files={files} lowerCardSwitcher={lowerCardSwitcher}/>}

      {/* Result component */}
      {resultsView && <ResultsCard />}
    </>
  )
}

export default DropZone
