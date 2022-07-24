import React from 'react'
import { useParams } from 'react-router-dom'
import PostForm from '../../components/PostForm'

const Modify = () => {
   const params = useParams()
   console.log(params)

   return (
      <div>
         <PostForm />
      </div>
   )
}

export default Modify
