import { React, useContext, ReactDOM } from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../utils/context/Auth/AuthContext'

import Like from '../Like/Like'
import './Card.css'

const Card = ({
   picture,
   title,
   description,
   likes,
   id,
   bool,
   avatar,
   userId,
   usersLiked,
   name
}) => {
   const [auth, setAuth] = useContext(AuthContext)
   let [userLiked, setUserLiked] = useState(0)
   let naigate = useNavigate()

   function deletePost() {
      fetch(`http://localhost:3000/api/posts/${id}`, {
         headers: {
            Authorization: `bearer ${auth.token}`,
         },
         method: 'DELETE',
         body: JSON.stringify({
            userId: auth.userId,
         }),
      })
         .then((res) => {res.json(); naigate('/')})
         .then((data) => console.log(data))
         .catch((error) => console.log(error))
   }

   function CardHearder() {
      return (
         <>
            <div className="post_user">
               <img src={avatar} alt={avatar} />
               <p className="">{name || 'John DOE'}</p>
            </div>
            <p className="post-title"> {title} </p>
         </>
      )
   }

   function CardMain() {
      return (
         <>
            <Link to={`/single-post/${id}`}>
               <div className="img-post">
                  <img src={picture} alt={picture} />
               </div>
            </Link>
            <div className="post-description">
               <p> {description} </p>
            </div>
         </>
      )
   }

   return (
      <article className="post">
         {!bool ? (
            <div>
               <header>
                  <Link to={`/single-post/${id}`}>
                     <CardHearder />
                  </Link>
               </header>
               <div>
                  <CardMain />
               </div>
               <div className="like-container">
                  <div className="post-likes">
                     <Like id={id} usersLiked={usersLiked} likes={likes} />
                  </div>
               </div>
            </div>
         ) : (
            <div>
               <header>
                  <div className="post_user">
                     <img src={avatar} alt={avatar} />
                     <p>{title}</p>
                  </div>
                  <p className="post-title"> {title} </p>
               </header>
               <div className="img-post">
                  <img src={picture} alt={picture} />
               </div>
               <div className="post-description">
                  <p> {description} </p>
               </div>
               <div>
                  <div className="post-likes">
                     <Like id={id} usersLiked={usersLiked} likes={likes} />
                  </div>
               </div>
               {userId === auth?.userId || auth.role === 'admin' ? (
                  <div className="btn-container">  
                     <Link className="btn btn--grey" to={`/modify/${id}`}>
                        Modifier
                     </Link>
                     <button
                        className="btn btn--red"
                        onClick={() => deletePost()}
                     >
                        {' '}
                        Supprimer{' '}
                     </button>
                  </div>
               ) : null}
            </div>
         )}
      </article>
   )
}

Card.propTypes = {
   label: PropTypes.string,
   title: PropTypes.string,
   picture: PropTypes.string,
   avatar: PropTypes.string,
   description: PropTypes.string,
   bool: PropTypes.bool,
}

export default Card
