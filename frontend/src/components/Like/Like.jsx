import { useState, React, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faFasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faFarHeart } from '@fortawesome/free-regular-svg-icons'
import { AuthContext } from '../../utils/context/Auth/AuthContext'
import './Like.css'
import { useNavigate } from 'react-router-dom'

const Like = ({ id, usersLiked, likes }) => {
   const [nbLike, setNbLike] = useState(0)
   const [newLike, setNewLike] = useState(false)
   const [auth, setAuth] = useContext(AuthContext)

   let navigate = useNavigate()

   const foundUserLiked = usersLiked.findIndex((element) => {
      return element === auth?.userId
   })

   useEffect(() => {
      if (foundUserLiked !== -1) {
         setNewLike(true)
      }
   }, [foundUserLiked])

   useEffect(() => {
      setNbLike(likes)
   }, [likes])

   function UserLiked() {
      if (newLike || foundUserLiked !== -1) {
         return (
            <div>
               <FontAwesomeIcon
                  icon={faFasHeart}
                  className="faHeart faHeart--red"
                  onClick={() => {
                     auth
                        ? sendLike(1, auth.userId)
                        : alert('Vous devez être connectez pour aimer ce post')
                  }}
               />
               <span> {nbLike} </span>
            </div>
         )
      } else {
         return (
            <div>
               <FontAwesomeIcon
                  icon={faFarHeart}
                  className="faHeart faHeart--black"
                  size="1x"
                  onClick={() => {
                     auth
                        ? sendLike(1, auth.userId)
                        : alert('Vous devez être connecter pour aimer ce post')
                  }}
               />
               <span> {nbLike} </span>
            </div>
         )
      }
   }

   function sendLike(like, userId) {
      fetch(`http://localhost:3000/api/posts/${id}/like`, {
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${auth.token}`,
         },
         method: 'POST',
         body: JSON.stringify({ like, userId }),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data)
            if (like === 1) {
               setNewLike(true)
               setNbLike(parseInt(nbLike) + 1)
            } else {
               setNewLike(false)
               setNbLike(parseInt(nbLike) - 1)
            }
         })
         .catch((error) => console.log(error))
   }

   return (
      <div>
         <UserLiked />
      </div>
   )
}

export default Like
