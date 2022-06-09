import React, { useState, useEffect } from 'react';
import {Outlet, Link, useNavigate} from 'react-router-dom'
import pokelogo from '../img/pokelogo.png'
import modoDia from '../img/sun.png'
import modoNoche from '../img/moon.png'
import '../css/styles.css'

const Layout = ({darkMode, setDarkMode, darkClass}) => {
  const navigate = useNavigate()
  const [darkIcon, setDarkIcon] = useState(modoDia);
  const [idPokemon, setIdPokemon] = useState('');
  const [menuDisplay, setMenuDisplay] = useState(true);
  
  const handleSubmit = e => {
    e.preventDefault()
    const route = '/pokedex/' + idPokemon.toLowerCase()
    navigate(route)
  }

  useEffect(() => {
    darkMode ? setDarkIcon(modoDia) : setDarkIcon(modoNoche)
  }, [darkMode]);

  return (
    <>
      <header className={`header ${darkClass}`}>
          <div className='contenedor barra'>
              <div className='barra-uno'>
                  <Link to='/pokedex'>
                      <img src={pokelogo} alt='Pokemon logo' title='Home link'/>
                  </Link>
                  <button
                      className='hamburger-menu'
                      type='button'
                      onClick={() => setMenuDisplay(!menuDisplay)}
                  >
                      <i className={menuDisplay ? 'fa fa-bars fa-4x' : 'fa fa-times fa-4x'}></i>
                  </button>
              </div>{/* BARRA UNO */}
              <div className={menuDisplay ? 'barra-dos menu-display' : 'barra-dos'}>
                  <form onSubmit={handleSubmit}>
                      <input
                          type='text'
                          placeholder='Search your Pokemon'
                          value={idPokemon}
                          onChange={e => setIdPokemon(e.target.value)}
                          className='nombre-form'
                      />
                      <button 
                          type='submit'
                          className='boton-form'
                          title='Search button'
                      >
                          <i className='fa fa-search'></i>
                      </button>
                  </form>
                  <button
                    type='button'
                    title='Dark-Mode button'
                    className='modo-oscuro'
                    onClick={() => setDarkMode(!darkMode)}
                  >
                      <p>{darkClass}</p>
                      <img 
                          src={darkIcon} 
                          alt='Night mode' 
                      />
                  </button>
              </div>{/* BARRA DOS */}
          </div>
      </header>
      <Outlet />
      <footer className={`footer ${darkClass}`}>
        <div className='contenedor'>
          <h4>An open-source site by Javier Buitrago, with help from Pokéapi.</h4>
          <h5>All content is © Nintendo, Game Freak, and The Pokémon Company.</h5>
        </div>
      </footer>
    </>
  )
}

export default Layout