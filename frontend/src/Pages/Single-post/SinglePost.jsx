import React from 'react'
import Card from '../../components/Card/Card'
import { useFetch } from '../../utils/hooks'
import Avatar from '../../assets/profile.svg'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const SinglePost = () => {
   const urlParams = useParams()
   const postsData = useFetch(`http://localhost:3000/api/posts/${urlParams.id}`)

   return (
      <div>
         {!postsData.isDataLoading ? (
            <Card
               id={postsData.data._id}
               avatar={Avatar}
               title={postsData.data.title}
               picture={postsData.data.imageUrl}
               description={postsData.data.description}
               likes={postsData.data.likes}
               dislikes={postsData.data.dislikes}
               bool={true}
            />
         ) : (
            <div>Votre fil d'actualité est vide</div>
         )}
      </div>
   )
}

export default SinglePost
