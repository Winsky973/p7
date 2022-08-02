import { NavLink, useNavigate } from 'react-router-dom'
import logoPrimary from '../../assets/logo-header.webp'
import { useContext, React} from 'react'
import { AuthContext } from '../../utils/context/Auth/AuthContext'
import { removeItem } from '../../services/LocalStorage'
import './Header.css'
import { useEffect } from 'react'
import { useState } from 'react'

const Header = () => {
   const [auth, setAuth] = useContext(AuthContext)
   const [ isLogged, setIsLogged ] = useState(false)
   let navigate = useNavigate()

   /**get les informations du local storage afin de pouvoir garder la connexion */

   function handleLogOut() {
      setAuth('')
      removeItem('userAuth')
      navigate('/signin')
      window.location.reload()
   }

   useEffect(() => {
      if(auth?.userId){
         setIsLogged(true)
      }
   }, [auth])

   return (
      <nav className="navigation">
         <div className="header-logo">
            <NavLink to="/">
               <img src={logoPrimary} alt={logoPrimary} />
            </NavLink>
         </div>
         <ul className="navigation-liste">
            {isLogged ? (
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
