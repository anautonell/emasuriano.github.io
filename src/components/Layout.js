import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { ThemeProvider, injectGlobal } from 'styled-components';

const theme = {
  backgroundColor: '#FFFFFF',
  color: '#1FB6FF'
};

injectGlobal`
  body {
    margin: 0;
    font-family: Cabin;
  }
`;

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Helmet>
          <link
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossorigin="anonymous"
          />
        </Helmet>
        {children}
      </Fragment>
    </ThemeProvider>
  );
};

export default Layout;
