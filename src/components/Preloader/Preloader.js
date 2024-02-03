import React from 'react'
import './Preloader.css'

function Preloader({ load }) {
    return (
        <div className={`preloader ${load ? 'preloader__active' : ''}`} >
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
