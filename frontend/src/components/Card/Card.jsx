import React from "react";
import PropTypes from 'prop-types'
import heartLogo from "../../assets/heart.svg";
import "./Card.css";

const Card = ({ label, picture, title, avatar, description, likes }) => {
  return (
    <article className="post">
      <header>
        <div className="post_user">
          <img src={avatar} alt={avatar} />
          <a href="/">{title}</a>
        </div>
        <p className="post-title"> {label} </p>
      </header>

      <div className="img-post">
        <img src={picture} alt={picture} />
      </div>
      <div className="post-description">
        <p> {description} </p>
      </div>
      <div className="post-like">
        <img src={heartLogo} alt={heartLogo} width="25" />
        <span className="likes"> { likes } </span>
      </div>
    </article>
  );
};

Card.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  picture: PropTypes.string,
  avatar: PropTypes.string,
  description: PropTypes.string,
}


export default Card;
