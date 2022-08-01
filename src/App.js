import './App.css';
import DropZone from './components/DropZone/DropZone';
import ResultsView from './components/ResultsView/ResultsView';
import { useState } from 'react'

function App() {
  const [uploadView, setUploadView] = useState(true);
  // const [uploadView, setUploadView] = useState(false);

  function segmentView() {
    console.log("Hola, esto activa el segment view.")
    setUploadView(!uploadView)
  }

  return (
    <div className="App">
      {
        uploadView ?
          <DropZone 
            style={{height:'100%'}} 
            setView={segmentView}
          />
          :
          <ResultsView setView={segmentView}/>
      }
    </div>
  )
}

export default App;
