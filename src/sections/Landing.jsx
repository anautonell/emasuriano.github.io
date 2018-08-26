import React, { Fragment } from 'react';
import Section from '../components/Section';
import SocialLink from '../components/SocialLink';
import { StaticQuery, graphql } from 'gatsby';
import { Heading, Flex } from 'rebass';
import TextLoop from 'react-text-loop';
import MouseIcon from '../components/MouseIcon';
import Triangle from '../components/Background/Triangle';

const Background = ({ children }) => (
  <div>
    <Triangle
      color="#cecdfe"
      height={['120vh', '25vh']}
      width={['40vw', '75vw']}
    />

    <Triangle
      color="#ff4081"
      height={['120vh', '28vh']}
      width={['35vw', '40vw']}
    />

    <Triangle
      color="#4b007d"
      top="25vh"
      right="75vw"
      height={['40vh', '25vh']}
      width={['60vw', '75vw']}
      invertX
    />
    {children}
  </div>
);

const LandingPage = (props, context) => {
  return (
    <Background>
      <Section.Container id="home">
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
                  Hello, I'm {name}!
                </Heading>
                <Heading
                  is="h2"
                  color="primary"
                  fontSize={[4, 5, 6]}
                  mb={[2, 4]}
                  textAlign="center"
                >
                  <TextLoop children={roles} />
                </Heading>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  flexWrap="wrap"
                >
                  {socialLinks.map(props => (
                    <SocialLink
                      mx={3}
                      color="primary"
                      hoverColor="primaryFaded"
                      fontSize={[5, 6, 6]}
                      key={props.page}
                      {...props}
                    />
                  ))}
                </Flex>
                <MouseIcon />
              </Fragment>
            );
          }}
        />
      </Section.Container>
    </Background>
  );
};

export default LandingPage;
