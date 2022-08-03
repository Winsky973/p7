import { useState, React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import logo from '../../assets/profile.svg'
import { useContext } from 'react'
import { AuthContext } from '../../utils/context/Auth/AuthContext'

const Signup = () => {
   const [userInfo, setuserInfo] = useState({ email: '', password: '' })
   const [userAuthStatueCode, setUserAuthStatueCode] = useState()
   const [isDataLoading, setDataLoading] = useState(true)
   const [auth, setAuth] = useContext(AuthContext)
   let navigate = useNavigate()

   useEffect(() => {
      if (auth) navigate('/')
   }, [auth, navigate])

   //Monitoring for field change
   const handleChange = (event) => {
      setuserInfo({
         ...userInfo,
         [event.target.name]: event.target.value,
      })
   }

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
            if (response.status === 201) {
               console.log(data)
               setUserAuthStatueCode(response.status)
               navigate('/signin')
            }
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
            <div className="form-input">
               <label>
                  <input
                     type="email"
                     name="email"
                     placeholder="johndoe@mail.com"
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
