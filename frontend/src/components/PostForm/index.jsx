import './index.css'
import React from 'react'
import { useState } from 'react'


const PostForm = ( {title, description} ) => {

   const [userFormInfo, setuserFormInfo] = useState({ title: '', description: ''})

   //Monitoring for field change
   const handleChange = (event) => {
      setuserFormInfo({
         ...userFormInfo,
         [event.target.name]: event.target.value,
      })
   }

   //take infos user when submit
   const handleSubmit = (event) => {
      console.log(userFormInfo)
      event.preventDefault()
   }

   return (
      <div className="container">
         <form className="form" onSubmit={handleSubmit}>
            <div className="form-container">
               <label>
                  <input type="text" name="title" placeholder="Titre" required value={userFormInfo.title} onChange={handleChange}  />
               </label>
               <label>
                  <textarea
                     name="description"
                     id="postDescription"
                     cols="30"
                     rows="10"
                     placeholder="Description"
                     value={userFormInfo.description} onChange={handleChange}
                  ></textarea>
               </label>
               <label htmlFor="file">
                  <input
                     type="file"
                     id="myFile"
                     name="file"
                     accept="image/*"
                     required
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

export default PostForm
