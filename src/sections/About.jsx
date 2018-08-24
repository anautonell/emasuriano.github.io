import React from 'react';
import Section from '../components/Section';
import { Heading, Box, Image, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const AboutText = styled(Box)`
  p {
    margin-top: 2em;
    line-height: 2em;
  }

  ul {
    margin: 0;
  }

  a { 
    padding: 5px;
    background: ${props => props.theme.colors.primaryFaded}
    cursor: pointer;
    text-decoration: none;
  }
`;

const About = () => {
  return (
    <Section id="about">
      <Heading color="secondary">
        About me{' '}
        <span role="img" aria-label="notebook">
          💻
        </span>
      </Heading>
      <StaticQuery
        query={graphql`
          query AboutMeQuery {
            contentfulAbout {
              description {
                childMarkdownRemark {
                  html
                }
              }
              profile {
                file {
                  url
                }
              }
            }
          }
        `}
        render={data => {
          const { description, profile } = data.contentfulAbout;
          return (
            <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
              <AboutText
                width={[1, 1, 3 / 4]}
                dangerouslySetInnerHTML={{
                  __html: description.childMarkdownRemark.html,
                }}
              />

              <Box width={[1, 1, 1 / 4]} css={{ maxWidth: '300px' }}>
                <Image
                  src={profile.file.url}
                  mx="auto"
                  css={{ borderRadius: '50%' }}
                />
              </Box>
            </Flex>
          );
        }}
      />
    </Section>
  );
};

export default About;
