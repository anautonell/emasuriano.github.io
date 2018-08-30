import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Heading, Flex } from 'rebass';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop';
import Section from '../components/Section';
import SocialLink from '../components/SocialLink';
import MouseIcon from '../components/MouseIcon';
import Triangle from '../components/Background/Triangle';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['25vh', '80vh']}
      width={['75vw', '60vw']}
    />

    <Triangle
      color="secondary"
      height={['28vh', '80vh']}
      width={['40vw', '35vw']}
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '35vh']}
      width={['75vw', '60vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['15vh', '20vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const LandingPage = () => (
  <Section.Container id="home" Background={Background}>
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
                name
              }
            }
          }
        }
      `}
      render={data => {
        const { name, socialLinks, roles } = data.site.siteMetadata;

        return (
          <Fragment>
            <Heading
              textAlign="center"
              is="h1"
              color="primary"
              fontSize={[5, 6, 8]}
              mb={[3, 4, 5]}
            >
              {`Hello, I'm ${name}!`}
            </Heading>
            <Heading
              is="h2"
              color="primary"
              fontSize={[4, 5, 6]}
              mb={[2, 4]}
              textAlign="center"
            >
              <TypistLoop interval={500}>
                {roles.map(text => (
                  <Typist key={text} delayStart={500}>
                    {text}
                    <Typist.Delay ms={500} />
                    <Typist.Backspace count={text.length} delay={200} />
                  </Typist>
                ))}
              </TypistLoop>
            </Heading>
            <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
              {socialLinks.map(linkProps => (
                <SocialLink
                  mx={3}
                  color="primary"
                  hoverColor="primaryLight"
                  fontSize={[5, 6, 6]}
                  key={linkProps.page}
                  {...linkProps}
                />
              ))}
            </Flex>
            <MouseIcon />
          </Fragment>
        );
      }}
    />
  </Section.Container>
);

export default LandingPage;
