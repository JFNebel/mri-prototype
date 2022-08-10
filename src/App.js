import './App.css';
import DropZone from './Components/DropZone/DropZone';
import LogIn from './Components/LogIn/LogIn';
import { useState } from 'react'

function App() {
  // const [uploadView, setUploadView] = useState(true);
  const [logInSuccess, setLogInSuccess] = useState(false);

  // function segmentView() {
  //   setUploadView(!uploadView)
  // }

  function submitCredentials() {
    setLogInSuccess(!logInSuccess);
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

      {
        logInSuccess ?
          <DropZone 
             style={{height:'100%'}}  
          /> :
        <LogIn logInSubmit={submitCredentials} />
      }

    </div>
  )
}

export default App;
