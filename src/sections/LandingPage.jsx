import React from 'react';
// import SocialIcons from '@components/SocialIcons';
// import Nav from '@components/Nav';
// import ScrollToNext from '@components/ScrollToNext';
// import BrowserNotes from '@components/BrowserNotes';
import Section from '../components/Section';
import { StaticQuery, graphql } from 'gatsby';
import FontAwesome from 'react-fontawesome';

const SocialLink = ({ page, link }) => (
  <a href={link} target="_blank">
    <FontAwesome name={page} />
  </a>
);

const LandingPage = (props, context) => {
  return (
    <Section className="landing-page">
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                name
                roles
                socialLinks {
                  page
                  link
                }
              }
            }
          }
        `}
        render={data => {
          const { name, socialLinks, roles } = data.site.siteMetadata;
          return (
            <main>
              {/* <BrowserNotes /> */}
              <div className="intro-wrapper">
                <h1>Hello, I'm {name}!</h1>
                <h3>{roles.reduce((acc, curr) => `${acc} | ${curr}`)}</h3>
                <div className="tagline">
                  {socialLinks.map(linkData => (
                    <SocialLink {...linkData} />
                  ))}
                </div>
                {/* <SocialIcons /> */}
              </div>
            </main>
          );
        }}
      />

      {/* <ScrollToNext pageSelector=".about-page" /> */}
    </Section>
  );
};

export default LandingPage;
