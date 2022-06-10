import React, { useState, useEffect } from 'react';

const OrderBoxPokedex = ({viewType, setViewType, viewSize, setViewSize}) => {
    const [typesList, setTypesList] = useState([]);

    useEffect(() => {
        const consultarTipos = async () => {
            const url = 'https://pokeapi.co/api/v2/type'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const arrayTipos = resultado.results.map((tipo) => {
                const objeto = {
                    typeName: tipo.name,
                    typeUrl: tipo.url
                }
                return objeto
             })
             setTypesList(arrayTipos);
        }
        consultarTipos()
      }, []);

  return (
    <div className='order-box contenedor'>
        <form>
            <select
                value={viewType}
                onChange={e => setViewType(e.target.value)}
                className='order-box-form'
            >
                <option value={''}>By type</option>
                {typesList.map(opcion => (
                    <option
                        key={opcion.typeUrl}
                        value={opcion.typeName}
                    >{opcion.typeName}</option>
                ))}
            </select>
        </form>
        <form>
            <select
                value={viewSize}
                onChange={e => setViewSize(e.target.value)}
                className='order-box-form'
            >
                <option value={9}>9 Pokémon</option>
                <option value={18}>18 Pokémon</option>
                <option value={36}>36 Pokémon</option>
                <option value={72}>72 Pokémon</option>
                <option value={144}>144 Pokémon</option>
                <option value={2000}>Gotta Catch 'Em All!</option>
            </select>
        </form>
    </div>
  )
}

export default OrderBoxPokedex