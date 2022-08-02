import { React, useContext } from 'react'
import { useFetch } from '../../utils/hooks'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../utils/context/Auth/AuthContext'
import { useEffect } from 'react'

const CreatePost = () => {
   /**Si l'image a changé */
   const [imageChange, setImageChange] = useState(false)
   const [imagePicked, setImagePicked] = useState()
   const [auth, setAuth] = useContext(AuthContext)
   let navigate = useNavigate()
   
   console.log(auth)
   useEffect(() => {
      if(!auth){
         navigate('/')
      }
   },[auth, navigate])

   const urlParams = useParams()

   const postsData = useFetch(`http://localhost:3000/api/posts/${urlParams.id}`)

   function handleImageChange(event) {
      setImageChange(true)
      console.log('event : ', event.target.files[0])
      setImagePicked(event.target.files[0])
   }

   // take infos user when submit
   const handleSubmit = (event) => {
      event.preventDefault()

      /**capte les données rentrées par  l'utilisateur */
      const postTitle = document.getElementById('post-title').value
      const postDescription = document.getElementById('post-description').value
      const postImage = document.getElementById('post-image')

      let formData = new FormData()
      if (imageChange) {
         formData.append(
            'post',
            JSON.stringify({
               description: postDescription,
               title: postTitle,
               userId: auth.userId,
            })
         )
         formData.append('image', postImage.files[0])
      } else {
         formData = JSON.stringify({
            description: postDescription,
            title: postTitle,
            userId: auth.userId,
         })
      }
      console.log('imagePicked : ', imagePicked)
      fetch(`http://localhost:3000/api/posts/${urlParams.id}`, {
         headers: {
            // Accept: 'application/json',
            // 'Content-Type': 'application/json',
            Authorization: `bearer ${auth.token}`,
         },
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
               <div className="form-input">
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
               </div>
               <div className="form-image">
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
                        placeholder="modifier"
                        onChange={handleImageChange}
                     />
                  </label>
               </div>
               <div className="btn-container">
                  <button
                     className="btn btn--red"
                     type="submit"
                     value="Envoyer"
                  >
                     Envoyer
                  </button>
               </div>
            </div>
         </form>
      </div>
   )
}

export default CreatePost
