import './App.css';
import DropZone from './components/DropZone/DropZone';
import {useDropzone} from 'react-dropzone';
import { useCallback, useState } from 'react'

function App() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setFiles(
      acceptedFiles.map(file => Object.assign(file,{
        preview:URL.createObjectURL(file)
      }))
    )
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const images = files.map(file => (
    // <img key={file.name} src={file.preview} 
    // alt="image" style={{width:'300px',height:'300px'}} />
    <img key={file.name} src={file.preview} alt="image"/>
  ))

  return (
    <div className="App">
      <div {...getRootProps()} 
        className="drop-zone"
        style={{ 
          backgroundColor:'#D9D9D9', 
          width: '45%', 
          height: '60%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          padding: '20px'
        }}
      >
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Suelta el archivo aquí</p> :
            <p style={{textAlign: 'center'}}>
            Coloca la imagen que deseas subir en este recuadro 
            <br/><br/>o<br/><br/> 
            Haz click aquí para buscarlo entre tus archivos.
            </p>
        }
      </div>

      <div className="img-preview">
        <div style={{textAlign: 'center', marginTop: '30px', marginBottom: '30px'}}>Aquí está el preview:</div>
        <div>{images}</div>
      </div>


      {/* <DropZone style={{height:'100%'}}/> */}

    </div>
  )
}

export default App;
