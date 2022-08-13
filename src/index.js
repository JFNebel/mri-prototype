import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LogIn from './Components/LogIn/LogIn';
import DropZone from './Components/DropZone/DropZone'

import './firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SnackbarProvider>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="admin" element={<p>Admin</p>} />
        <Route path="segmenter" element={<DropZone />} />
    </Routes>
    </SnackbarProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
