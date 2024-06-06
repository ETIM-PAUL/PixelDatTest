import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Home';
import reportWebVitals from './reportWebVitals';
import { Web3ModalProvider } from './Web3Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Another from './another';
import Contact from './contact';
import Home from './Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/another" element={<Another />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Web3ModalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
