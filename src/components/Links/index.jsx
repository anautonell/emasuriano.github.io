import React from 'react';
import './style.scss';
import '../../assets/fonts/fontello-771c82e0/css/fontello.css';

const Links = props => {
  const { twitter, github, email, linkedIn } = props.data;
  return (
    <div className="links">
      <ul className="links__list">
        <li className="links__list-item">
          <a href={`https://www.twitter.com/${twitter}`} target="_blank">
            <i className="icon-twitter" />
          </a>
        </li>
        <li className="links__list-item">
          <a href={`https://www.github.com/${github}`} target="_blank">
            <i className="icon-github" />
          </a>
        </li>
        <li className="links__list-item">
          <a href={`mailto:${email}`}>
            <i className="icon-mail" />
          </a>
        </li>
      </ul>
      <ul className="links__list">
        <li className="links__list-item">
          <a href={`https://www.linkedin.com/in/${linkedIn}/`} target="_blank">
            <i className="icon-linkedin" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Links;
