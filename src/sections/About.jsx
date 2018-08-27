import React from 'react';
import Section from '../components/Section';
import { Box, Image, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Triangle from '../components/Background/Triangle';

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={['20vh', '40vh']}
      width={['75vw', '70vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
    />
  </div>
);

const AboutText = styled(Box)`
  p:first-child {
    margin-top: 0em;
  }

  p {
    margin-top: 2em;
    line-height: 2em;
  }

  ul {
    margin: 0;
  }

  a {
    display: inline-block;
    transition: color 250ms, text-shadow 250ms;
    color: black;
    text-decoration: none;
    position: relative;

    &:after {
      position: absolute;
      z-index: -1;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      content: '';
      width: 100%;
      height: 3px;
      background-color: ${props => props.theme.colors.primaryLight};
      transition: all 250ms;
    }

    &:hover {
      color: white;

      &::after {
        height: 110%;
        width: 110%;
      }
    }
  }
`;

const About = () => {
  return (
    <Section.Container id="about" Background={Background}>
      <Section.Header name="About me" icon="🙋‍♂️" label="person" />
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
                  pl={1}
                  pt={1}
                  css={{ borderRadius: '50%' }}
                />
              </Box>
            </Flex>
          );
        }}
      />
    </Section.Container>
  );
};

export default About;
