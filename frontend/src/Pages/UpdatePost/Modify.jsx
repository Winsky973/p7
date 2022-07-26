import React, { useEffect } from 'react'
import PostForm from '../../components/PostForm'
import { useFetch, usePostFetch } from '../../utils/hooks'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

// sauce: '{"name":"photoshop","manufacturer":"rzeef","description":"zefzefzefe","mainPepper":"eazfzefzefe","heat":4,"userId":"62a5b8718b8744293ae819ce"}'

const CreatePost = () => {
   /**Si l'image a changé */
   const [imageChange, setImageChange] = useState(false)
   const [imagePicked, setImagePicked] = useState(false)

   const urlParams = useParams()
   
   const postsData = useFetch(`http://localhost:3000/api/posts/${urlParams.id}`)
   console.log('postsData : ', postsData.data)

   function handleImageChange (event){
      setImagePicked(event.target.files[0])
      setImageChange(true)
   }
   
   
   // take infos user when submit
   const handleSubmit = (event) => {
      event.preventDefault()

      /**capte les données rentrées par  l'utilisateur */
      const postTitle = document.getElementById('post-title').value
      const postDescription = document.getElementById('post-description').value
      const postImage = document.getElementById('post-image')

      const formData = new FormData()

      if(imageChange)
      {
         formData.append(
            'post',
            JSON.stringify({ description: postDescription, title: postTitle, userId: "62a5b8718b8744293ae819ce" })
         )
         formData.append('image', postImage.files[0])
      }else{
         formData.append(
            'post',
            JSON.stringify({ description: postDescription, title: postTitle, userId: "62a5b8718b8744293ae819ce" })
         )
      }

      console.log(formData)

      fetch(`http://localhost:3000/api/posts/${urlParams.id}`, {
         method: 'PUT',
         body: formData,
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
                     id="post-title"
                     type="text"
                     name="title"
                     placeholder="Titre"
                     required
                     defaultValue={postsData.data.title}
                  />
               </label>
               <label>
                  <textarea
                     id="post-description"
                     name="description"
                     cols="30"
                     rows="10"
                     placeholder="Description"
                     defaultValue={postsData.data.description}
                  ></textarea>
               </label>
               <label htmlFor="file">
                  {imageChange ? (
                     <div>
                     <img src={imagePicked} alt="imgUrl" />
                  </div>
                  ) : (
                     <div>
                     <img src={postsData.data.imageUrl} alt="imgUrl" />
                  </div>
                  )}
                  <input
                     id="post-image"
                     type="file"
                     name="file"
                     accept="image/*"
                     placeholder='modifier'
                     onChange={handleImageChange}
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

export default CreatePost
