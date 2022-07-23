import React from 'react'
import './Signin.css'
import logo from '../../assets/profile.svg'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Signin = () => {
   const [userInfo, setuserInfo] = useState({ email: '', password: '' })
   const [errorMessages, setErrorMessages] = useState({})
   const [isSubmitted, setIsSubmitted] = useState(false)
   const [userAuthInfo, setUserAuthInfo] = useState()
   const [isDataLoading, setDataLoading] = useState(true)

   //Monitoring for field change
   const handleChange = (event) => {
      setuserInfo({
         ...userInfo,
         [event.target.name]: event.target.value,
      })
   }

   const errors = {
      uname: 'email invalide',
      pass: 'Mot de passe invalide',
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
            const response = await fetch('http://localhost:3000/api/auth/login', {
               method: 'POST',
               headers: {
                  Accept: 'application/json, text/plain',
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ email: userInfo.email , password: userInfo.password }),
            })
            const data = await response.json()
            setUserAuthInfo(data)
         } catch (error) {console.log(error)} 
         finally { setDataLoading(false) }
      }
      fetchAuth()
      event.preventDefault()
   }

   if(!isDataLoading && userAuthInfo.token !== null){
      console.log('userAuthInfo : ', userAuthInfo)
   }

   return (
      <div className="container">
         <div className="logo-container">
            <img src={logo} alt={logo} />
            <p>Connexion</p>
         </div>
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
                  {renderErrorMessage('email')}
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

               <button className="btn" type="submit" value="Envoyer">
                  Envoyer
               </button>
               <div>Vous n'avez pas de compte <NavLink to='/signup'>Creez en un</NavLink></div>
            </div>
         </form>
      </div>
   )
}

export default Signin
