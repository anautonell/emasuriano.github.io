import React from 'react';
import ReactHelmet from 'react-helmet';
import appleTouchIcon from './apple-touch-icon.png';
import favicon32 from './favicon-32x32.png';
import favicon16 from './favicon-16x16.png';
import safariPinnedTab from './safari-pinned-tab.svg';
import favicon from './favicon.ico';
import bigIcon from './android-chrome-192x192.png';

const Helmet = () => {
  const title = 'Ema Suriano';
  const description =
    'My portfolio where you can see who I am, my projects and the related stuff with me!';
  return (
    <ReactHelmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={'https://emasuriano.com' + bigIcon} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@emasuriano" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={'https://emasuriano.com' + bigIcon} />
      <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
      <link rel="mask-icon" href={safariPinnedTab} color="#5bbad5" />
      <link rel="shortcut icon" href={favicon} />
      <meta name="theme-color" content="#ffffff" />
      <link
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
        crossorigin="anonymous"
      />
    </ReactHelmet>
  );
};

export default Helmet;
