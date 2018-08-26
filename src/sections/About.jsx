import React from 'react';
import Section from '../components/Section';
import { Heading, Box, Image, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

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

  /* a { 
    padding: 5px;
    background: ${props => props.theme.colors.primaryFaded}
    color: ${props => props.theme.colors.background}
    cursor: pointer;
    text-decoration: none;
  } */

  a {
		display: inline-block;
    /* color: ${props => props.theme.colors.primary}; */
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
			background-color: ${props => props.theme.colors.primaryFaded};
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
    <Section.Container id="about">
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
