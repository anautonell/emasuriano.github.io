import React from 'react';
import Link from 'gatsby-link';
import Menu from '../Menu';
import Links from '../Links';
import profilePicture from '../../assets/images/profilePictureLogo.png';
import './style.scss';

const Sidebar = props => {
  const { author, subtitle, menu } = props.data.site.siteMetadata;

  const authorBlock = (
    <div>
      <Link to="/">
        <img
          src={profilePicture}
          className="sidebar__author-photo"
          width="75"
          height="75"
          alt={author.name}
        />
      </Link>
      <h1 className="sidebar__author-title">
        <Link className="sidebar__author-title-link" to="/">
          {author.name}
        </Link>
      </h1>
      <p className="sidebar__author-subtitle">{subtitle}</p>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__inner">
        <div className="sidebar__author">{authorBlock}</div>
        <div>
          <Menu data={menu} />
          <Links data={author} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
