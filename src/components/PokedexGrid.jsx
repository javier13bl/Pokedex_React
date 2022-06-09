import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import pokeball from '../img/pokeball.png'

const PokedexGrid = ({viewType, viewSize}) => {
    const [pokemonGroup, setPokemonGroup] = useState([]);
    const [pokemonView, setPokemonView] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [totalSize, setTotalSize] = useState(1);
    const [pageNumber, setPageNumber] = useState(0);
    const pageCount = Math.ceil(totalSize / viewSize)

    const handlePageClick = (e) => {
        setPageNumber(e.selected)
    }

    useEffect(() => {
        setPageNumber(0)
    }, [viewType, viewSize]);

    useEffect(() => {
        const offSet = pageNumber * viewSize
        const endOffSet = offSet + viewSize
        const consultarPokemons = async () => {
            if (Object.keys(viewType).length) {
                try {
                    const url = `https://pokeapi.co/api/v2/type/${viewType}`
                    const respuesta = await fetch(url)
                    const resultado = await respuesta.json()
                    const arrayType = resultado.pokemon.slice(offSet, endOffSet).map((pokemonType) => {
                        const objeto = {
                            name: pokemonType.pokemon.name,
                            url: pokemonType.pokemon.url
                        }
                        return objeto
                    })
                    setPokemonGroup(arrayType);
                    setTotalSize((resultado.pokemon).length)
                } catch (error) {
                    console.log(error);
            }
            } else {
                try {
                    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=${viewSize}`
                    const respuesta = await fetch(url)
                    const resultado = await respuesta.json()
                    setPokemonGroup(resultado.results);
                    setTotalSize(resultado.count)
                } catch (error) {
                    console.log(error);
                }
            }
        }
        consultarPokemons()
    }, [viewType, viewSize, pageNumber]);

    useEffect(() => {
        const consultarAPI = async () => {
            setCargando(true)
            try {
                let arrayPokemons=[]
                for (let i = 0; i < pokemonGroup.length; i++) {
                    const respuesta = await fetch(pokemonGroup[i].url)
                    const resultado = await respuesta.json()
                    const objeto = {
                        id: resultado.id,
                        name: resultado.name,
                        types: resultado.types,
                        img: resultado.sprites.front_default
                    }
                    arrayPokemons.push(objeto)
                }
                setPokemonView(arrayPokemons)
                setCargando(false)
            } catch (error) {
                console.log(error);
            }
        }
        consultarAPI()
    }, [pokemonGroup]);

  return (
    cargando ? (
        <img src={pokeball} alt='pokeball' className='pokeball-loading'/>
    ) : (<>
    <nav className='grid'>
        {pokemonView.map(pokemon => (
            <Link
                key={pokemon.id}
                to={pokemon.name}
                className={pokemon.id > 898 ? 'card extra' : 'card'}
            >
                <img
                    src={pokemon.img != null ? pokemon.img : pokeball}
                    alt={`${pokemon.name} -Pokémon image`}
                />
                <div className='card-content'>
                    <div className='card-title'>
                        <span>N {pokemon.id}</span>
                        <h2>{pokemon.name}</h2>
                    </div>
                    <div className='card-types'>
                        {pokemon.types.map((tipo) => (
                            <h3 key={tipo.slot}>{tipo.type.name}</h3>
                        ))}
                    </div>
                </div>
            </Link>
        ))}
    </nav>
    <ReactPaginate
        breakLabel='...'
        nextLabel='Next >>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel='<< Previous'
        forcePage={pageNumber}
        containerClassName='pag-buttons'
        disabledClassName='pag-disabled'
        activeClassName='pag-active'
    />
    </>)
  )
}

export default PokedexGrid