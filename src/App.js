import './App.css';
import { useState } from 'react'
import LogIn from './Components/LogIn/LogIn';
import DropZone from './Components/DropZone/DropZone';

// Componentes individuales
// import FeedbackModal from './Components/FeedbackModal/FeedbackModal';
// import T1T2Choice from './Components/T1T2Choice/T1T2Choice';


function App() {

  // Component selectors
  const [logInSuccess, setLogInSuccess] = useState(false);
  // const [uploadView, setUploadView] = useState(true);

  // Función de auth
  function submitCredentials() {
    setLogInSuccess(!logInSuccess);
  }

  return (
    <div className="App">

      {/* Verídico */}
      {logInSuccess ? <DropZone />:<LogIn logInSubmit={submitCredentials} />}


      {/* Componentes individuales */}
      {/* <FeedbackModal /> */}
      {/* <DropZone /> */}

    </div>
  )
}

export default App;
