import React from 'react'
import { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import { useFetch } from '../../utils/hooks'
import Avatar from '../../assets/profile.svg'
import './Home.css'

const Home = () => {
   // const postsData = useFetch(`http://localhost:3000/api/posts`)
   // console.log('postsData : ', postsData)
   const [data, setData] = useState()
   const [isDataLoading, setIsDataLoading] = useState(true)

   useEffect(() => {
      fetch(`http://localhost:3000/api/posts`)
      .then((response) => response.json())
      .then((data) => {
         setData(data)
         setIsDataLoading(false)
      })
      .catch((error) => console.log(error))
   }, [])
   
   if(!isDataLoading){
      data.map((data) => console.log(data))
   }

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
                  bool= {false}
               />
            ))
         ) : (
            <div>Votre fil d'actualité est vide</div>
         )}
         <span className="bubble"></span>

         {/* {postsData.isDataLoading === false && postsData.data.length !== 0 ? (
            postsData.data.map((post, index) => (
               <Card
                  key={`${post.name}-${index}`}
                  id={post._id}
                  avatar={Avatar}
                  title={post.name}
                  label={post.postTitle}
                  picture={post.imageUrl}
                  description={post.description}
                  likes={post.likes}
                  toggleCard={false}
               />
            ))
         ) : (
            <div>Votre fil d'actualité est vide</div>
         )}
         <span className="bubble"></span> */}
      </div>
   )
}

export default Home
