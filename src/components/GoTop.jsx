import React, { useState, useEffect } from 'react';
import '../css/pokedex.css'

const GoTop = () => {
    const [visible, setVisible] = useState(false);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    const showButton = () => {
        if (window.pageYOffset > 200) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }
    window.addEventListener('scroll', showButton)

  return (
    <button
        className={visible ? 'gotop-button gotop-visible' : 'gotop-button'}
        onClick={scrollUp}
    >
        <i className='fa fa-chevron-up fa-4x'></i>
    </button>
  )
}

export default GoTop