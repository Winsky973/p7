import { NavLink } from 'react-router-dom'
import logoPrimary from '../../assets/logo-header.webp'
import { useContext, React } from 'react'
import { AuthContext } from '../../utils/context/Auth/AuthContext'
import './Header.css'
const Header = () => {
   const auth = useContext(AuthContext)
   console.log('auth', auth.isAuthenticated)

   function handleLogOut(){
      console.log('On est déconnecté')
   }

   return (
      <nav className="navigation">
         <div className="header-logo">
            <NavLink to="/">
               <img src={logoPrimary} alt={logoPrimary} />
            </NavLink>
         </div>
         <ul className="navigation-liste">
            {auth.isAuthenticated ? (
               <>
                  <li>
                     <NavLink to="/create">Ajouter un post</NavLink>
                  </li>
                  <li>
                     <button className='btn btn--red' onClick={handleLogOut}>Log out</button>
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
