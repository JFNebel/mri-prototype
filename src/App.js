import './App.css';
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
    <img key={file.name} src={file.preview} 
    alt="image" style={{width:'200px',height:'200px'}} />
  ))

  return (
    <div class="App">
      <div {...getRootProps()} style={{ backgroundColor:'red', width: '80%', height: '40%'}}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <div class="cosa">Aqui estan los previes</div>
      <div>{images}</div>
    </div>
  )
}

export default App;
