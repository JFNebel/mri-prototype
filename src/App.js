import './App.css';
import DropZone from './Components/DropZone/DropZone';
import DropZoneT2 from './Components/DropZoneT2/DropZoneT2';
import LogIn from './Components/LogIn/LogIn';
import { useState } from 'react'
import FeedbackModal from './Components/FeedbackModal/FeedbackModal';
import T1T2Choice from './Components/T1T2Choice/T1T2Choice';

function App() {
  // Component selectors
  const [logInSuccess, setLogInSuccess] = useState(false);
  // const [uploadView, setUploadView] = useState(true);

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


      {/* Este es */}
      {
        logInSuccess ?
          <DropZone 
             // style={{height:'100%'}}  
          /> :
        <LogIn logInSubmit={submitCredentials} />
      }

      {/* Componentes individuales */}
      {/* <FeedbackModal /> */}
      {/* <DropZoneT2 /> */}

    </div>
  )
}

export default App;
