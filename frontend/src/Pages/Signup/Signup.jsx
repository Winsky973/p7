import { useState, React } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import logo from '../../assets/profile.svg'

const Signup = () => {
   const [userInfo, setuserInfo] = useState({ email: '', password: '' })
   const [userAuthStatueCode, setUserAuthStatueCode] = useState()
   const [isDataLoading, setDataLoading] = useState(true)

   let navigate = useNavigate()

   //Monitoring for field change
   const handleChange = (event) => {
      setuserInfo({
         ...userInfo,
         [event.target.name]: event.target.value,
      })
   }

   function ToggleConnect() {
      return (
         <>
            <div>Comte créer</div>
            <div>Connectez vous</div>
            <button
               className="btn btn--red"
               onClick={navigate('/signup', { replace: true })}
            >
               Connexion
            </button>
         </>
      )
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
               setUserAuthStatueCode(response.status)
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

   console.log(userAuthStatueCode)

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
