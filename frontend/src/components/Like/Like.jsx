import { useState, React, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faFasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faFarHeart } from '@fortawesome/free-regular-svg-icons'
import { AuthContext } from '../../utils/context/Auth/AuthContext'
import './Like.css'
import { useFetch } from '../../utils/hooks'

const Like = ({ id, usersLiked }) => {
   const [like, setLike] = useState(0)
   const [isClicked, setIsClicked] = useState(false)
   const [auth, setAuth] = useContext(AuthContext)

   const buffer = { userId: auth.userId, like }

   const foundUserLiked = usersLiked.findIndex((element) => {
      return element === auth.userId
   })

   const toggleLike = () => {
      if (like === 0) {
         setLike(1)
         setIsClicked(true)
      } else {
         setLike(0)
         setIsClicked(true)
      }
   }

   function UserLiked() {
      if (foundUserLiked !== -1) {
         return (
            <FontAwesomeIcon
               icon={faFasHeart}
               className="faHeart faHeart--red"
               onClick={() => toggleLike}
            />
         )
      } 
      else  {
         return (
            <FontAwesomeIcon
               icon={faFarHeart}
               className="faHeart faHeart--black"
               size="1x"
            />
         )
      }
   }

   function sendLike() {
      fetch(`http://localhost:3000/api/posts/${id}/like`, {
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `bearer ${auth.token}`,
         },
         method: 'POST',
         body: JSON.stringify({ ...buffer }),
      })
         .then((res) => res.json())
         .then((data) => console.log(data))
         .catch((error) => console.log(error))
   }

   if (isClicked) {
      sendLike()
   }

   return (
      <div onClick={() => toggleLike()}>
         <UserLiked />
      </div>
   )
}

export default Like
