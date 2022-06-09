import pokeball from '../img/pokeball.png'
import '../css/pokemon.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Loading = ({idName}) => {
    const [loading, setLoading] = useState(false);
    setTimeout(() => {
        setLoading(true)
    }, 5000);
  return (
    <div>
        {!loading ? <h2>Loading ...</h2> : <h3 className='load-text'>ERR_CONNECTION_TIMED_OUT</h3>}
        {!loading ? (
            <img
                src={pokeball}
                alt='Loading icon'
                className='pokeball-loading'
            />
        ) : (
            <div className='loading'>
                <h1>This site can't be reached</h1>
                <h4>Domain <span>'../pokedex/{idName}'</span> took too long to respond.</h4>
                <h4>Please check in <span>'{idName}'</span> for mistyped errors or try again later.</h4>
                <br></br>
                <h3>Try a new search:</h3>
                <ul>
                    <li>Pokédex Numbers: <span>1 - 898</span></li>
                    <li>Pokémon Extra: <span>10001 - 10228</span></li>
                </ul>
            </div>
        )}
        <div className='home-link'>
            <Link to={'/pokedex'}>
                <h3>Go Home</h3>
            </Link>
        </div>
    </div>
  )
}

export default Loading