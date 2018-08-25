import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { injectGlobal } from 'styled-components';
import { Provider } from 'rebass';
import { configureAnchors } from 'react-scrollable-anchor';
import 'react-tippy/dist/tippy.css';

configureAnchors({ scrollDuration: 600, offset: 0 });

const colors = {
  background: '#FFFFFF',
  primary: '#6200EE',
  primaryVariant: '#3700B3',
  primaryFaded: '#6200EEAA',
  secondary: '#03DAC6',
  secondaryVariant: '#018786',
};

injectGlobal`
  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: Cabin;
  }
`;

const Layout = ({ children }) => {
  return (
    <Provider theme={{ colors }}>
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
    </Provider>
  );
};

export default Layout;
