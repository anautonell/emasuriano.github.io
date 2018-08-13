import React, { Fragment } from 'react';
import Section from '../components/Section';
import SocialLink from '../components/SocialLink';
import { StaticQuery, graphql } from 'gatsby';
import { Heading, Flex } from 'rebass';
import styled from 'styled-components';

const LandingSection = styled(Section)`
  color: ${props => props.theme.color};
  text-align: center;
`;

const LandingPage = (props, context) => {
  return (
    <LandingSection name="landing">
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
            <Fragment>
              <Heading is="h1" fontSize={[5, 6, 8]} mb={[3, 4, 5]}>
                Hello, I'm {name}!
              </Heading>
              <Heading is="h2" fontSize={[1, 2, 4]} mb={[2, 3]}>
                {roles.reduce((acc, curr) => `${acc} | ${curr}`)}
              </Heading>
              <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
                {socialLinks.map(({ page, name }) => (
                  <SocialLink
                    m={2}
                    fontSize={[5, 5, 6]}
                    key={page}
                    page={page}
                    name={name}
                  />
                ))}
              </Flex>
            </Fragment>
          );
        }}
      />
    </LandingSection>
  );
};

export default LandingPage;
