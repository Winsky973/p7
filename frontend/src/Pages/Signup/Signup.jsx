import React from 'react';
import './Signup.css'
import logo from '../../assets/profile.svg'

const Signup = () => {
    return (
        <div className="container">
        <div className="logo-container">
           <img src={logo} alt={logo} />
           <p>Inscription</p>
        </div>
        <form className="form">
           <div className="form-container">
              <label>
                 <input type="text" name="title" placeholder="Identidiant" />
              </label>

              <label>
                 <input type="text" name="title" placeholder="Mot de passe" />
              </label>

              <button className="btn" type="submit" value="Envoyer">
                 Envoyer
              </button>
           </div>
        </form>
     </div>
    );
};

export default Signup;