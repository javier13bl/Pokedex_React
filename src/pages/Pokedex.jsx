import React, { useState, useEffect } from 'react';
import GoTop from '../components/GoTop';
import OrderBoxPokedex from '../components/OrderBoxPokedex'
import PokedexGrid from '../components/PokedexGrid';
import '../css/pokedex.css'

const Pokedex = ({darkClass}) => {
  const nameTrainer = localStorage.getItem('nombre') ?? 'Trainer'
  const [viewType, setViewType] = useState('');
  const [viewSize, setViewSize] = useState(9);

  return (
    <main className={`main ${darkClass}`}>
      <div className='contenedor'>
        <h2>Welcome <span>{nameTrainer}! </span>Let's find your <span>Favorite Pokémon</span></h2>
        <OrderBoxPokedex
          viewType={viewType}
          setViewType={setViewType}
          viewSize={viewSize}
          setViewSize={setViewSize}
        />
        <PokedexGrid
          viewType={viewType}
          viewSize={viewSize}
        />
        <GoTop />
      </div>
    </main>
  )
}

export default Pokedex