import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import LogIn from './pages/LogIn'
import Pokedex from './pages/Pokedex'
import Pokemon from './pages/Pokemon'
import React, { useState, useEffect } from 'react';
import './css/normalize.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [darkClass, setDarkClass] = useState('');

  useEffect(() => {
    darkMode ? setDarkClass('light-mode') : setDarkClass('dark-mode')
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogIn/>}/>

        <Route path='/pokedex' element={<Layout
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                darkClass={darkClass}
            />}
        >
            <Route index element={<Pokedex
                    darkClass={darkClass}
            />}/>
            <Route path=':idName' element={<Pokemon
                    darkClass={darkClass}
            />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
