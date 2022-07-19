import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Modify.css'



const Modify = () => {
   const params = useParams()
   console.log(params)
   
   return (
      <div className="container">
         <form className="form">
            <div className="form-container">
               <label>
                  <input type="text" name="title" placeholder="Titre" />
               </label>
               <label>
                  <textarea
                     name="description"
                     id="postDescription"
                     cols="30"
                     rows="10"
                     placeholder="Description"
                  ></textarea>
               </label>
               <label htmlFor="file">
                  <input
                     type="file"
                     id="myFile"
                     name="filename"
                     accept="image/*"
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

export default Modify
