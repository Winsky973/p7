import React from 'react';
import { useEffect, useState } from 'react'
import Card from '../../components/Card/Card';
import DefaultPicture from '../../assets/image.png'
import { useFetch } from '../../utils/hooks';
import Avatar from '../../assets/profile.svg'
import './Home.css'

const Home = () => {

    const [isDataLoading, setDataLoading] = useState(true)
    const { data, isLoading } = useFetch(`http://localhost:3000/api/posts`)

    const postsData  = useFetch(`http://localhost:3000/api/posts`)

    return (
        <div>
        { postsData.isDataLoading === false ? postsData.data.map((post, index) => (
            <Card
                key={`${post.name}-${index}`}
                avatar={Avatar}
                title={post.name}
                label={post.postTitle}
                picture={DefaultPicture}
                description={post.description}
                likes={post.likes}
            />
        )) : <div>lol</div> } 
        <span className='bubble'></span>
    </div>
    );
};

export default Home;