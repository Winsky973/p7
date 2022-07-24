import React, { useEffect } from 'react'
import PostForm from '../../components/PostForm'
import { useFetch, usePostFetch } from '../../utils/hooks'
import { useState } from 'react'


// sauce: '{"name":"photoshop","manufacturer":"rzeef","description":"zefzefzefe","mainPepper":"eazfzefzefe","heat":4,"userId":"62a5b8718b8744293ae819ce"}'


const CreatePost = () => {
   // state pour le fichier image
   const [selectedFile, setSelectedFile] = useState()
   const [isFilePicked, setIsFilePicked] = useState(false)
   // const [userFormInfo, setuserFormInfo] = useState({
   //    title: '',
   //    description: '',
   // })


   // const handleImageChange = (event) => {
   //    setSelectedFile(event.target.files[0])
   //    setIsFilePicked(true)
   // }

   // //Monitoring for field change
   // const handleChange = (event) => {
   //    setuserFormInfo({
   //       ...userFormInfo,
   //       [event.target.name]: event.target.value,
   //    })
   // }

   // take infos user when submit
   const handleSubmit = (event) => {
      event.preventDefault()

      const postTitle = document.getElementById('post-title').value
      const postDescription = document.getElementById('post-description').value
      const postImage = document.getElementById('post-image')

      console.log('postTitle : ',postTitle)
      console.log('postDescription : ', postDescription)
      console.log('postImage : ', postImage.files[0])
      const formData = new FormData()
      formData.append('description', postDescription)
      formData.append('title', postTitle)
      formData.append('image', postImage.files[0])




      fetch('http://localhost:3000/api/posts', {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
         method: 'POST',
         body: formData,
      })
         .then((res) => {
            if (res.ok) res.json()
         })
         .then((data) => console.log('data : ', data))
         .catch((error) => console.log(error))
   }

   return (
      <div className="container">
         <form className="form" onSubmit={handleSubmit}>
            <div className="form-container">
               <label>
                  <input
                     id="post-title"
                     type="text"
                     name="title"
                     placeholder="Titre"
                     required
                     // value={userFormInfo.title}
                     // onChange={handleChange}
                  />
               </label>
               <label>
                  <textarea
                     id="post-description"
                     name="description"
                     cols="30"
                     rows="10"
                     placeholder="Description"
                     // value={userFormInfo.description}
                     // onChange={handleChange}
                  ></textarea>
               </label>
               <label htmlFor="file">
                  <input
                     id="post-image"
                     type="file"
                     name="file"
                     accept="image/*"
                     // onChange={handleImageChange}
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
