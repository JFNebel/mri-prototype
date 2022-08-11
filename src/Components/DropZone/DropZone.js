import './DropZone.css';
import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone';
import PreviewCard from '../PreviewCard/PreviewCard';
import ResultsCard from '../ResultsCard/ResultsCard';

function DropZone() {
  const [files, setFiles] = useState([]);
  const [previewView, setPreviewView] = useState();
  const [resultsView, setResultsView] = useState();


  const onDrop = useCallback(acceptedFiles => {
    // Do que ocurre cuando dropeo algo en el DropZone.
    
    // Lógica de rederización para lower cards
    setPreviewView(true)
    setResultsView(false)
    
    // Este set file tiene que appendear
    setFiles(['hola, funcioó el seter'])


    // setFiles((files) => [...files, acceptedFiles])
    // setFiles([...files, acceptedFiles])
    // setFiles(files.concat(acceptedFiles))

    console.log('This are my files: ')
    console.log(files)

    console.log('This are my acceptedFiles: ')
    console.log(acceptedFiles)

    // console.log('Antes del for each')
    // files.forEach((entry) => {
    //   console.log(entry);
    // });

    // console.log('This are my ...files: ')
    // console.log(...files)
    // console.log('This are my [...files, acceptedFiles]: ')
    // console.log([...files, acceptedFiles])
  }, [])



  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    maxFiles: 2
    // multiple: false,
  })


  // Itemización de las imágenes
  // const images = files.map(file => (
  //   <img 
  //     key={file.name} 
  //     src={file.preview} 
  //     alt="image" 
  //     style={{ maxWidth:'200px', maxHeight:'200px', margin: '3px' }} 
  //   />
  // ))

  // Con accepted Items
  // const acceptedFileItems = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  // Con los files
    const acceptedFileItems = files.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));



  // The real segmenter
  // const segmenter = () => {
  //   const [ file ] = files;
  //   sendFile({ file })
  //     .then((data) => setPredFile(data))
  //     .catch(error => console.log(error));
  // }








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
              <p>Arrastra el archivo T1 aquí</p> :
              <p>
              Arrastra el archivo T1 que deseas subir en este recuadro 
              <br/><br/>o<br/><br/> 
              Haz click aquí para buscarlo entre tus carpetas.
              </p>
          }
        </div>
      </div>

      {/* Preview component */}
      {previewView && <PreviewCard items={acceptedFileItems} segmenter={segmenter}/>}

      {/* Result component */}
      {resultsView && <ResultsCard />}





      {/* Actual download button */}
      {/* { */}
      {/*   predFile && */}
      {/*     <div className="download-button"> */}
      {/*       <Button variant="outlined" onClick={() => { */}
      {/*             const url = URL.createObjectURL(predFile.blob); */}
      {/*             const link = document.createElement('a'); */}
      {/*             link.href = url; */}
      {/*             link.download = predFile.filename; */}
      {/*             link.click(); */}
      {/*           } */}
      {/*         } */}
      {/*       > */}
      {/*         Descargar */}
      {/*       </Button> */}
      {/*     </div> */}
      {/* } */}


    </>
  )
}

export default DropZone
