import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/modify">modify</Link>
        </nav>
    );
};

export default Header;