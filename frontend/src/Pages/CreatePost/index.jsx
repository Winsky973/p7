import React, { useEffect } from 'react'
import PostForm from '../../components/PostForm'
import { useFetch, usePostFetch } from '../../utils/hooks'
import { useState } from 'react'

const CreatePost = () => {
   const [userFormInfo, setuserFormInfo] = useState({
      title: '',
      description: '',
   })

   //Monitoring for field change
   const handleChange = (event) => {
      setuserFormInfo({
         ...userFormInfo,
         [event.target.name]: event.target.value,
      })
   }

   //take infos user when submit
   const handleSubmit = (event) => {
       event.preventDefault()
       const splitFile = userFormInfo.file.split(`\\` || `/`).pop()
       delete userFormInfo.file
       userFormInfo['file'] = splitFile
       console.log(userFormInfo)
      fetch('http://localhost:3000/api/posts', {
         method: 'POST',
         headers: {
            Accept: 'application/json, text/plain',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(({post: userFormInfo}))
      })
         .then((res) => res.json())
         .then((data) => console.log(data))
         .catch((error) => console.log(error))
   }

   return (
      <div className="container">
         <form className="form" onSubmit={handleSubmit}>
            <div className="form-container">
               <label>
                  <input
                     type="text"
                     name="title"
                     placeholder="Titre"
                     required
                     value={userFormInfo.title}
                     onChange={handleChange}
                  />
               </label>
               <label>
                  <textarea
                     name="description"
                     id="postDescription"
                     cols="30"
                     rows="10"
                     placeholder="Description"
                     value={userFormInfo.description}
                     onChange={handleChange}
                  ></textarea>
               </label>
               <label htmlFor="file">
                  <input
                     type="file"
                     id="myFile"
                     name="file"
                     accept="image/*"
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

export default CreatePost
