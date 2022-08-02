import React from 'react'
import Card from '../../components/Card/Card'
import { useFetch } from '../../utils/hooks'
import Avatar from '../../assets/profile.svg'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const SinglePost = () => {
   const urlParams = useParams()
   const postsData = useFetch(`http://localhost:3000/api/posts/${urlParams.id}`)

   return (
      <div>
         {!postsData?.isDataLoading ? (
            <Card
               id={postsData.data._id}
               avatar={Avatar}
               title={postsData.data.title}
               picture={postsData.data.imageUrl}
               description={postsData.data.description}
               likes={postsData.data.likes}
               bool={true}
               userId={postsData.data.userId}
               usersLiked={postsData.data.usersLiked}
            />
         ) : (
            <div>Votre fil d'actualité est vide</div>
         )}
      </div>
   )
}

export default SinglePost
