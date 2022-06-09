import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import pokelogo from '../img/pokelogo.png'
import '../css/styles.css'

const LogIn = () => {
    const navigate = useNavigate()
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = e => {
        e.preventDefault()
        if (nombre.length <= 0) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000);
            return
        }
        localStorage.setItem('nombre', nombre)
        navigate('/pokedex')
    }

  return (
    <main className='login-bg'>
        <div className='login-contenedor'>
            <img src={pokelogo} alt='logo'/>
            <div className='login-submit'>
                <h1>Hi, Trainer!</h1>
                <h2>First, what is your name?</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Your name here'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        className='nombre-form'
                    />
                    <input
                        type='submit'
                        value={'Send'}
                        className='boton-form'
                    />
                    {error && <p className='error'>This field is required</p>}
                </form>
            </div>
        </div>
    </main>
  )
}

export default LogIn