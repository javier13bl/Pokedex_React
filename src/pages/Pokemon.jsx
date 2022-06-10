import React, { useState, useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom'
import GoTop from '../components/GoTop';
import Loading from '../components/Loading';
import bug from '../img/types/bug.png'
import dark from '../img/types/dark.png'
import dragon from '../img/types/dragon.png'
import electric from '../img/types/electric.png'
import fairy from '../img/types/fairy.png'
import fighting from '../img/types/fighting.png'
import fire from '../img/types/fire.png'
import flying from '../img/types/flying.png'
import ghost from '../img/types/ghost.png'
import grass from '../img/types/grass.png'
import ground from '../img/types/ground.png'
import ice from '../img/types/ice.png'
import normal from '../img/types/normal.png'
import poison from '../img/types/poison.png'
import psychic from '../img/types/psychic.png'
import rock from '../img/types/rock.png'
import steel from '../img/types/steel.png'
import water from '../img/types/water.png'

const Pokemon = ({darkClass}) => {
    const typeIcons = [bug, dark, dragon, electric, fairy, fighting, fire, flying, ghost, grass, ground, ice, normal, poison, psychic, rock, steel, water]
    // typeIcons.map((yuca) => { console.log(yuca); })
    const x = typeIcons.filter((yuca) => { return yuca === '/src/img/types/bug.png' })
    console.log(x[0]);
    const {idName} = useParams()
    const [cargando, setCargando] = useState(true);
    const [pokemon, setPokemon] = useState([]);
    const {id, name, types, abilities, height, weight, moves, stats, sprites} = pokemon

    useEffect(() => {
        const consultarAPI = async () => {
            setCargando(true)
            try {
                const url = `https://pokeapi.co/api/v2/pokemon/${idName}`
                const asnwer = await fetch(url)
                const result = await asnwer.json()
                const {id, name, types, abilities, height, weight, moves, stats, sprites} = result
                const objeto = {
                    id, name,  types, abilities, height, weight, moves, stats, sprites
                }
                setPokemon(objeto)
                setCargando(false)
            } catch (error) {
                console.log(error);
            }
        }
        consultarAPI()
    }, [idName]);

  return (
    <main className={`main ${darkClass}`}>
        <div className='contenedor'>
            {cargando ?
            <Loading
                idName = {idName}
            /> : <>
                <h2>Pokédex N.{id} - <span>{name}</span></h2>
                <section className='pokemon-data'>
                    <div className='info-left'>
                        <div className='pokemon-img'>
                            <img
                                src={sprites.other['official-artwork'].front_default ? sprites.other['official-artwork'].front_default : pokeball}
                                alt={`Image pokémon ${name}`}
                            />
                        </div>
                        <div className='pokemon-types'>
                            {types.map((tipo) => (
                                <img
                                    src={typeIcons.filter((yuca) => { return yuca === `/src/img/types/${tipo.type.name}.png`})[0]}
                                    alt={`Icon type ${tipo.type.name}`}
                                    title={`Type ${tipo.type.name} icon`}
                                    key={tipo.slot}
                                    className='pokemon-type'
                                />
                            ))}
                        </div>
                        <h3>
                            {types[1] == undefined ?
                                types[0].type.name :
                                `${types[0].type.name} / ${types[1].type.name}`
                            }
                        </h3>
                    </div>
                    <div className='info-center'>
                        <div className='pokemon-size'>
                            <h3>{height / 10} m <span>height</span></h3>
                            <h3>{weight / 10} kg <span>weight</span></h3>
                        </div>
                        <div className='pokemon-size'>
                            <h3 className='pokemon-info-title'>Abilities</h3>
                            <div>
                                {abilities.map((habilidad) => (
                                    <h3 key={habilidad.slot}>{habilidad.ability.name}</h3>
                                ))}
                            </div>
                        </div>
                        <div className='pokemon-size'>
                            <h3 className='pokemon-info-title'>Stats</h3>
                            <div>
                                {stats.map((estadistica) => (<Fragment key={estadistica.stat.url}>
                                    <h3>{`${estadistica.stat.name} - ${estadistica.base_stat}`}</h3>
                                    <progress value={estadistica.base_stat} max={'150'}>
                                        {estadistica.base_stat}
                                    </progress>
                                </Fragment>))}
                            </div>
                        </div>
                        <div className='pokemon-size'>
                            <h3 className='pokemon-info-title'>Moves</h3>
                            <ul>
                                {moves.map((movimiento) => (
                                    <li key={movimiento.move.url}>{movimiento.move.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='info-right'>
                        {id!==1 && (id==10001 ? (
                            <Link to={'../898'}>
                                <h4>Previous</h4>
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/898.png`}
                                    alt={`Pokémon N.898`}
                                />
                            </Link>
                        ): (
                            <Link to={`../${id-1}`}>
                                <h4>Previous</h4>
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id-1}.png`}
                                    alt={`Pokémon N.${id-1}`}
                                />
                            </Link>
                        ))}
                        {id==898 ? (
                            <Link to={'../10001'}>
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10001.png`}
                                    alt={`Pokémon N.10001`}
                                />
                                <h4>Next</h4>
                            </Link>
                        ) : (id==10228 ? (
                            <Link to={'#'}>
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`}
                                    alt={`Pokémon N.${id-1}`}
                                />
                                <h4>9th gen</h4>
                            </Link>
                        ): (
                            <Link to={`../${id+1}`}>
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id+1}.png`}
                                    alt={`Pokémon N.${id+1}`}
                                />
                                <h4>Next</h4>
                            </Link>
                        ))}
                    </div>
                </section>
                <GoTop />
            </>}
        </div>
    </main>
  )
}

export default Pokemon