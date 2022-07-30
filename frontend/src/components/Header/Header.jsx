import { Navigate, NavLink } from 'react-router-dom'
import logoPrimary from '../../assets/logo-header.webp'
import { Route, Routes } from 'react-router-dom'
import { useContext, React, useState } from 'react'
import { AuthContext } from '../../utils/context/Auth/AuthContext'
import { getItem, removeItem } from '../../services/LocalStorage'
import './Header.css'
import { useEffect } from 'react'
const Header = () => {
   const [auth, setAuth] = useContext(AuthContext)

   /**get les informations du local storage afin de pouvoir garder la connexion */
   const [userAuthLocalStorage, setAuthLocalStorage] = useState(() => {
      // getting stored value
      const saved = JSON.parse(localStorage.getItem('userAuth'))
      return saved || ''
   })

   if (userAuthLocalStorage !== '') {
      setAuth(true)
   }

   function handleLogOut() {
      removeItem('userAuth')(
         <Routes>
            <Route path="/" element={<Navigate to="/" replace />} />
         </Routes>
      )
   }

   return (
      <nav className="navigation">
         <div className="header-logo">
            <NavLink to="/">
               <img src={logoPrimary} alt={logoPrimary} />
            </NavLink>
         </div>
         <ul className="navigation-liste">
            {auth ? (
               <>
                  <li>
                     <NavLink to="/create">Ajouter un post</NavLink>
                  </li>
                  <li>
                     <button className="btn btn--red" onClick={handleLogOut}>
                        Log out
                     </button>
                  </li>
               </>
            ) : (
               <>
                  <li>
                     <NavLink to="/">Accueil</NavLink>
                  </li>
                  <li>
                     <NavLink to="/signup">signup</NavLink>
                  </li>
                  <li>
                     <NavLink to="/signin">sign in</NavLink>
                  </li>
               </>
            )}
         </ul>
      </nav>
   )
}

export default Header
