import React from 'react'
import './Signup.css'
import logo from '../../assets/profile.svg'
import { useState } from 'react'

const Signup = () => {
   const [userInfo, setuserInfo] = useState({ email: '', password: '' })
   const [errorMessages, setErrorMessages] = useState({})
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
            const response = await fetch(
               'http://localhost:3000/api/auth/signup',
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
            console.log(data)

            setUserAuthInfo(data)
         } catch (error) {
            console.log(error)
         } finally {
            setDataLoading(false)
         }
      }
      fetchAuth()
      event.preventDefault()
   }

   return (
      <div className="container">
         <div className="logo-container">
            <img src={logo} alt={logo} />
            <p>Inscription</p>
         </div>
         <form className="form" onSubmit={handleSubmit}>
            <div className="form-container">
               <label>
                  <input
                     type="email"
                     name="email"
                     placeholder="mail"
                     required
                     value={userInfo.mail}
                     onChange={handleChange}
                  />
               </label>

               <label>
                  <input
                     type="password"
                     name="password"
                     placeholder="Mot de passe"
                     required
                     value={userInfo.password}
                     onChange={handleChange}
                  />
               </label>

               <button className="btn btn--red" type="submit" value="Envoyer">
                  Envoyer
               </button>
            </div>
         </form>
      </div>
   )
}

export default Signup
