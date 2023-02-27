import './App.css';
import React, { useState } from 'react'
import Singup from './components/Singup';
import { CookiesProvider } from 'react-cookie';
import {Route, Link, Routes} from 'react-router-dom';
import Todo from './components/Todo';
import Singin from './components/Singin';


const App = () => {

  return (
    <CookiesProvider>
      <Routes>
        <Route exact path='/' element={<Singin />} />
        <Route exact path='/todo' element={<Todo />} />
        <Route exact path='/signup' element={<Singup />} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
