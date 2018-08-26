import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { injectGlobal } from 'styled-components';
import { Provider } from 'rebass';
import { configureAnchors } from 'react-scrollable-anchor';
import 'react-tippy/dist/tippy.css';
import theme from '../utils/theme';

configureAnchors({ scrollDuration: 600, offset: 0 });

injectGlobal`
  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: Cabin;
  }
`;

const Layout = ({ children }) => {
  return (
    <Provider theme={theme}>
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
