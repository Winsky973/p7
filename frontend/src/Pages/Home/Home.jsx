import React from 'react';
import Card from '../../components/Card/Card';
import DefaultPicture from '../../assets/image.png'
import Avatar from '../../assets/profile.svg'
 
const post = [
    {
        avatar : Avatar,
        profileName: 'John Doe',
        postTitle: 'Un animal posé OKLM dans la nature prêt à se faire shoot par un stupide humain ',
        picture: DefaultPicture,
        postDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat tristique habitant ac ultricies arcu arcu. Diam dolor quam felis, faucibus. Tellus a consectetur nunc, mattis. A aenean tristique at.'

    },
    {
        avatar : Avatar,
        profileName: 'Jane Doe',
        postTitle: 'Un animal posé OKLM dans la nature prêt à se faire shoot par un stupide humain ',
        picture: DefaultPicture,
        postDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat tristique habitant ac ultricies arcu arcu. Diam dolor quam felis, faucibus. Tellus a consectetur nunc, mattis. A aenean tristique at.'

    },
    
]

const Home = () => {
    return (
        <div>
        <h1>Accueil</h1>
        {post.map((profile, index) => (
            <Card
                key={`${profile.name}-${index}`}
                avatar={profile.avatar}
                title={profile.profileName}
                label={profile.postTitle}
                picture={profile.picture}
                description={profile.postDescription}
            />
        ))}
    </div>
    );
};

export default Home;