import React from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Admin from './components/Admin'
import Drawer from './components/Drawer';
import LogIn from './components/LogIn';
import DropZone from './components/DropZone';

import MainContext from './context';


import './firebase';

const App = () => {

  const [user, setUser] = React.useState({});
  const [managUser, setManagUser] = React.useState(false);

  const valueContext = {
    user,
    setUser,
    managUser,
    setManagUser,
  };

  return (
    <MainContext.Provider value={valueContext}>
      <BrowserRouter>
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="admin" element={<Drawer><Admin/></Drawer>} />
          <Route path="segmenter" element={<Drawer><DropZone /></Drawer>} />
      </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  </MainContext.Provider>
  )
}

export default App;