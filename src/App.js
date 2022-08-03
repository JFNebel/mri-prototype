import './App.css';
import DropZone from './Components/DropZone/DropZone';
import { useState } from 'react'

function App() {
  const [uploadView, setUploadView] = useState(true);
  // const [uploadView, setUploadView] = useState(false);

  function segmentView() {
    setUploadView(!uploadView)
  }

  return (
    <div className="App">
      {/* { */}
      {/*   uploadView ? */}
      {/*     <DropZone */} 
      {/*       style={{height:'100%'}} */} 
      {/*       setView={segmentView} */}
      {/*     /> */}
      {/*     : */}
      {/*     <ResultsView setView={segmentView}/> */}
      {/* } */}

      <DropZone 
        style={{height:'100%'}} 
      />
    </div>
  )
}

export default App;
