import React from 'react'
import { NavLink } from 'react-router-dom'
import logoPrimary from '../../assets/logo-header.webp'
import './Header.css'

const Header = () => {
   return (
      <nav className="navigation">
         <div className="header-logo">
            <NavLink  to="/">
               <img src={logoPrimary} alt={logoPrimary} />
            </NavLink>
         </div>
         <ul className="navigation-liste">
            <li>
               <NavLink to="/">Accueil</NavLink>
            </li>
            <li>
               <NavLink to="/signup">signup</NavLink>
            </li>
            <li>
               <NavLink to="/signin">sign in</NavLink>
            </li>
         </ul>
      </nav>
   )
}

export default Header
