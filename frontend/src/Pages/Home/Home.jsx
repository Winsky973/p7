import React from 'react'
import { useEffect, useState, useContext } from 'react'
import Card from '../../components/Card/Card'
import Avatar from '../../assets/profile.svg'
import './Home.css'
import { getItem } from '../../services/LocalStorage'
import { AuthContext } from '../../utils/context/Auth/AuthContext'

const Home = () => {
   // const postsData = useFetch(`http://localhost:3000/api/posts`)
   // console.log('postsData : ', postsData)
   const [data, setData] = useState()
   const [isDataLoading, setIsDataLoading] = useState(true)
   const [auth, setAuth] = useContext(AuthContext)

   useEffect(() => {
      fetch(`http://localhost:3000/api/posts`)
         .then((response) => response.json())
         .then((data) => {
            setData(data)
            setIsDataLoading(false)
         })
         .catch((error) => console.log(error))
   }, [auth])

   return (
      <div>
         {isDataLoading === false && data.length !== 0 ? (
            data.map((post, index) => (
               <Card
                  key={`${post.title}-${index}`}
                  id={post._id}
                  avatar={Avatar}
                  title={post.title}
                  picture={post.imageUrl}
                  description={post.description}
                  likes={post.likes}
                  bool={false}
                  usersLiked={post.usersLiked}
               />
            ))
         ) : (
            <div>Votre fil d'actualité est vide</div>
         )}
         <span className="bubble"></span>
      </div>
   )
}

export default Home
