import React, { Fragment } from 'react';
import Section from '../components/Section';
import SocialLink from '../components/SocialLink';
import { StaticQuery, graphql } from 'gatsby';
import { Heading, Flex } from 'rebass';
import TextLoop from 'react-text-loop';

const LandingPage = (props, context) => {
  return (
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
                fontSize={[3, 4, 6]}
                mb={[2, 4]}
                textAlign="center"
              >
                <TextLoop children={roles} />
              </Heading>
              <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
                {socialLinks.map(props => (
                  <SocialLink
                    mx={3}
                    color="primary"
                    hoverColor="primaryFaded"
                    fontSize={[5, 5, 6]}
                    key={props.page}
                    {...props}
                  />
                ))}
              </Flex>
            </Fragment>
          );
        }}
      />
    </Section.Container>
  );
};

export default LandingPage;
