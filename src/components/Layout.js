import React from 'react';
import Helmet from 'react-helmet';

const Layout = ({ children }) => {
  return (
    <div>
      <Helmet>
        <link
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
          crossorigin="anonymous"
        />
      </Helmet>
      {children}
    </div>
  );
};

export default Layout;
