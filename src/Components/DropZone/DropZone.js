import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone';

function DropZone() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log("recibido el archivo")
    setFiles(
      acceptedFiles.map(file => Object.assign(file,{
        preview:URL.createObjectURL(file)
      }))
    )
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const images = files.map(file => (
    <img 
      key={file.name} 
      src={file.preview} 
      alt="image" 
      style={{ width:'200px', height:'200px' }} 
    />
  ))

  return (
    <>
      <div 
        className="drop-zone" 
        style={{ 
          backgroundColor:'red', 
          width: '60%', 
          height: '60%',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Suelta el archivo aquí</p> :
              <p>Coloca el archivo que deseas subir en este recuadro o haz click para buscarlo entre tus archivos</p>
          }
        </div>
      </div>
      <div className="cosa">Aqui estan los previes</div>
      <div>{images}</div>
    </>
  )

}

export default DropZone
