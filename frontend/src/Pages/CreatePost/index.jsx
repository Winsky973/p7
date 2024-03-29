import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../utils/context/Auth/AuthContext'

const CreatePost = () => {
   // state pour le fichier image
   const [message, setMessage] = useState()
   const [auth, setAuth] = useContext(AuthContext)

   let navigate = useNavigate()
   useEffect(() => {
      if(!auth){
         navigate('/')
      }
   },[auth, navigate])

   // take infos user when submit
   const handleSubmit = (event) => {
      event.preventDefault()

      /**capte les données rentrées par  l'utilisateur */
      const postTitle = document.getElementById('post-title').value
      const postDescription = document.getElementById('post-description').value
      const postName= document.getElementById('post-name').value
      const postImage = document.getElementById('post-image')

      const formData = new FormData()
      formData.append(
         'post',
         JSON.stringify({
            description: postDescription,
            title: postTitle,
            name: postName,
            userId: auth.userId,
         })
      )
      formData.append('image', postImage.files[0])

      fetch(`http://localhost:3000/api/posts`, {
         headers: {
            Authorization: `bearer ${auth.token}`,
         },
         method: 'POST',
         body: formData,
      })
         .then((res) => {if(res.ok) navigate('/')})
         .then((data) => setMessage(data))
         .catch((error) => console.log(error))
   }

   return (
      <div className="container">
         <form className="form" onSubmit={handleSubmit}>
            <div className="form-input">
               <label>
                  <input
                     id="post-title"
                     type="text"
                     name="title"
                     placeholder="Titre"
                     required
                  />
               </label>
               <label>
                  <input
                     id="post-name"
                     type="text"
                     name="nom"
                     placeholder="nom"
                     required
                  />
               </label>
               <label>
                  <textarea
                     id="post-description"
                     name="description"
                     cols="30"
                     rows="10"
                     placeholder="Description"
                  ></textarea>
               </label>
               <label htmlFor="file">
                  <input
                     id="post-image"
                     type="file"
                     name="file"
                     accept="image/*"
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
