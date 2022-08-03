import React from 'react'
import './Error.css'
import img404 from '../../assets/404.webp'
import { Link } from 'react-router-dom'

const Error = () => {
   return (
      <div className="container">
         <div>
            <img src={img404} alt={img404} />
         </div>
         <div className="container-title">
            <h1> Oupss!! Cette page n'exite pas</h1>
         </div>

         <div className="btn-container">
            <Link className="btn btn--grey" to={'/'}>
               Accueil
            </Link>
         </div>
      </div>
   )
}

export default Error
