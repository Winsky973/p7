import React from 'react'
import PropTypes from 'prop-types'
import heartLogo from '../../assets/heart.svg'
import './Card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const element = <FontAwesomeIcon icon={faCoffee} />

const Card = ({
   picture,
   title,
   description,
   likes,
   id,
   bool,
   avatar,
   dislikes
}) => {
   return (
      <article className="post">
         {!bool ? (
            <div>
               <header>
                  <Link to={`/single-post/${id}`}>
                     <div className="post_user">
                        <img src={avatar} alt={avatar} />
                        <p>{title} </p>
                     </div>
                     <p className="post-title"> {title} </p>
                  </Link>
               </header>
               <Link to={`/single-post/${id}`}>
                  <div className="img-post">
                     <img src={picture} alt={picture} />
                  </div>
               </Link>
               <div className="post-description">
                  <p> {description} </p>
               </div>
               <div className="like-container">
                  <div className="post-likes">
                     <img src={heartLogo} alt={heartLogo} width="25" />
                     <span> {likes} </span>
                  </div>
                  <div className="post-likes">
                     <img src={heartLogo} alt={heartLogo} width="25" />
                     <span> {dislikes} </span>
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
               <div className="like-container">
                  <div className="post-likes">
                     <img src={heartLogo} alt={heartLogo} width="25" />
                     <span> {likes} </span>
                  </div>
                  <div className="post-likes">
                     <img src={heartLogo} alt={heartLogo} width="25" />
                     <span> {dislikes} </span>
                  </div>
               </div>
               <div className="btn-container">
                  <Link className="btn btn--grey" to={`/modify/${id}`}>
                     Modifier
                  </Link>
                  <button
                     className="btn btn--red"
                     onClick={() => {fetch(`http://localhost:3000/api/posts/${id}`, {
                        method: 'DELETE',
                        body: JSON.stringify({userId: '62a5b8718b8744293ae819ce'}),
                     })
                        .then((res) => res.json())
                        .then((data) => console.log(data))
                        .catch((error) => console.log(error))}}
                  >
                     {' '}
                     Supprimer{' '}
                  </button>
               </div>
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
