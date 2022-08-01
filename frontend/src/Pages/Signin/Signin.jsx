import React, { useEffect } from 'react'
import './Signin.css'
import logo from '../../assets/profile.svg'
import { NavLink, Navigate, Routes } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../utils/context/Auth/AuthContext'
import { setItem } from '../../services/LocalStorage'

const Signin = ({ history }) => {
   const [userInfo, setuserInfo] = useState({ email: '', password: '' })
   const [errorMessages, setErrorMessages] = useState(false)
   const [userAuthInfo, setUserAuthInfo] = useState({})
   const [isDataLoading, setDataLoading] = useState(true)

   const [auth, setAuth] = useContext(AuthContext)

   //Monitoring for field change
   const handleChange = (event) => {
      setuserInfo({
         ...userInfo,
         [event.target.name]: event.target.value,
      })
   }

   // Generate JSX code for error message
   const renderErrorMessage = (name) =>
      name === errorMessages.name && (
         <div className="error">{errorMessages.message}</div>
      )

   //take infos user when submit
   const handleSubmit = (event) => {
      async function fetchAuth() {
         setDataLoading(true)
         try {
            const response = await fetch(
               'http://localhost:3000/api/auth/login',
               {
                  method: 'POST',
                  headers: {
                     Accept: 'application/json, text/plain',
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                     email: userInfo.email,
                     password: userInfo.password,
                  }),
               }
            )
            const data = await response.json()

            if (data.token === undefined) {
               setErrorMessages(true)
               setUserAuthInfo('')
            } else {
               setErrorMessages(false)
               setUserAuthInfo(data)
               auth(data)
            }
         } catch (error) {
            setErrorMessages(error)
         } finally {
            setDataLoading(false)
         }
      }
      fetchAuth()
      event.preventDefault()
   }

   function handleRedirect() {
      // window.location.reload()
   }

   return (
      <div className="container">
         <div className="logo-container">
            <img src={logo} alt={logo} />
            <p>Connexion</p>
         </div>
         {!userAuthInfo.hasOwnProperty('userId') ? (
            <div>Compte ou mot de passe incorret</div>
         ) : (
            (setItem('userAuth', JSON.stringify(userAuthInfo)))
         )}
         <form className="form" onSubmit={handleSubmit}>
            <div className="form-container">
               <label>
                  <input
                     type="email"
                     name="email"
                     placeholder="jonhdoe@mail.fr"
                     value={userInfo.email}
                     onChange={handleChange}
                     required
                  />
                  {renderErrorMessage({ userAuthInfo })}
               </label>

               <label>
                  <input
                     type="password"
                     name="password"
                     placeholder="Mot de passe"
                     value={userInfo.password}
                     onChange={handleChange}
                     required
                  />
                  {renderErrorMessage('pass')}
               </label>

               <button className="btn btn--red" type="submit" value="Envoyer">
                  Envoyer
               </button>
               <div>
                  Vous n'avez pas de compte {String(auth)}{' '}
                  <NavLink to="/signup">Creez en un</NavLink>
               </div>
            </div>
         </form>
      </div>
   )
}

export default Signin
