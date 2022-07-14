import React from 'react';
import { useParams } from 'react-router-dom';

const Modify = () => {
    const params = useParams()
    console.log(params)

    return (
        <div>
            <h1>Page de modification</h1>
        </div>
    );
};

export default Modify;