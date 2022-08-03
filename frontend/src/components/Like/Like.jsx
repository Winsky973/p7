import { useState, React, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faFasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faFarHeart } from '@fortawesome/free-regular-svg-icons'
import { AuthContext } from '../../utils/context/Auth/AuthContext'
import './Like.css'

const Like = ({ id, usersLiked, likes }) => {
   const [auth] = useContext(AuthContext)
   const [userLiked, setUserLiked] = useState(false)
   const [totalLikes, setTotalLikes] = useState(likes)

   useEffect(() => {
      if (auth) {
         if (usersLiked.includes(auth.userId)) {
            setUserLiked(true)
         }
      }
   }, [auth, usersLiked])

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
            if (like === 0) {
               setTotalLikes(totalLikes - 1)
               setUserLiked(false)
            } else {
               setTotalLikes(totalLikes + 1)
               setUserLiked(true)
            }
         })
         .catch((error) => console.log(error))
   }

   return (
      <>
         <div>
            {userLiked ? (
               <button
                  className="likeButton"
                  onClick={() => sendLike(0, auth.userId)}
               >
                  <FontAwesomeIcon
                     icon={faFasHeart}
                     className="faHeart faHeart--red"
                  />
                  <span> {totalLikes} </span>
               </button>
            ) : (
               <button
                  className="likeButton"
                  onClick={() => sendLike(1, auth.userId)}
               >
                  <FontAwesomeIcon
                     icon={faFarHeart}
                     className="faHeart faHeart--black"
                     size="1x"
                  />
                  <span> {totalLikes} </span>
               </button>
            )}
         </div>
      </>
   )
}

export default Like
