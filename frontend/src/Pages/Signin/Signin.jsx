import React from 'react'
import './Signin.css'
import logo from '../../assets/profile.svg'
import { useState, useEffect } from 'react'



const Signin = () => {

   const [contactInfo, setContactInfo] = useState({mail : "", pass : ""})

   const handleChange = (event) => {
      setContactInfo({...contactInfo, [event.target.name] : event.target.value})
   }

   const handleSubmit =  (event) => {
      event.preventDefault()
      console.log(contactInfo);
   }

   useEffect(() => {
      async function fetchUSer(){
         try{
            const response = await fetch('')
         }
         catch{

         }
         finally{
            
         }
      }
      fetchUSer()
   }, [])

   return (
      <div className="container">
         <div className="logo-container">
            <img src={logo} alt={logo} />
            <p>Connexion</p>
         </div>
         <form className="form" onSubmit={ handleSubmit }>
            <div className="form-container">
               <label>
                  <input
                     type="mail"
                     name="mail"
                     placeholder="jonhdoe@mail.fr"
                     value={ contactInfo.mail }
                     onChange={handleChange}
                  />
               </label>

               <label>
                  <input
                     type="password"
                     name="pass"
                     placeholder="Mot de passe"
                     value={ contactInfo.pass }
                     onChange={handleChange}
                  />
               </label>

               <button className="btn" type="submit" value="Envoyer">
                  Envoyer
               </button>
            </div>
         </form>
      </div>
   )
}

export default Signin
