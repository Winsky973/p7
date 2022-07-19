import React from 'react';
import { useEffect, useState } from 'react'
import Card from '../../components/Card/Card';
import DefaultPicture from '../../assets/image.png'
import Avatar from '../../assets/profile.svg'
import './Home.css'

const Home = () => {

    const [postData, setPostData] = useState()
    const [isDataLoading, setDataLoading] = useState(true)

    useEffect(() => {
        async function fetchPost(){
            try {
                const response = await fetch(`http://localhost:3000/api/posts`)
                const postData = await response.json()
                setPostData(postData)
            } catch (error) {
                console.log(error)
            }finally{
                setDataLoading(false)
            }
        }
        fetchPost()
     }, [])

     if(!isDataLoading){
         console.log('postData : ', postData)
         postData.map((res) => console.log(res))
     }

    return (
        <div>
        { !isDataLoading ? postData.map((post, index) => (
            <Card
                key={`${post.name}-${index}`}
                avatar={Avatar}
                title={post.name}
                label={post.postTitle}
                picture={DefaultPicture}
                description={post.description}
                likes={post.likes}
            />
        )) : null} 
        <span className='bubble'></span>
    </div>
    );
};

export default Home;