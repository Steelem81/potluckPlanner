import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './views/Index';
import Main from './views/Main';
import NewEvent from './views/NewEvent';
import UpdateEvent from './views/UpdateEvent';
import Invitation from './views/Invitation';
// import {useState, useEffect } from 'react';
// import axios from 'axios';

const App = () => {

  return (
    

    <div>
      <BrowserRouter>
      <Navbar />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/main" element={<Main/>}/>
          <Route path="/event/new" element={<NewEvent/>}/>
          <Route path="/event/:id/update" element={<UpdateEvent/>}/>
          <Route path="/invitation/:id/update" element = {<Invitation/>}/>
        </Routes>
        </div>
      </BrowserRouter>  
    </div>
  );
}

export default App;
