import React from 'react';
import Section from '../components/Section';
import { Heading, Box, Text, Image, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
// import profile from './profile.jpg';

const ListItem = ({ children }) => (
  <li>
    <Text pb={1}>{children}</Text>
  </li>
);

const Highlight = ({ children, to }) => (
  <Text
    css={{ display: 'inline', cursor: to ? 'pointer' : 'default' }}
    p={1}
    bg="primaryFaded"
  >
    {to ? <a href={`#${to}`}>{children}</a> : children}
  </Text>
);

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
      <Heading color="secondary">About me 👨‍💻</Heading>
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
              {/* <Box width={[1, 1, 3 / 4]}>
                <Text lineHeight={2}>
                  I’m in love with <Highlight>Javascript</Highlight> and all the
                  ecosystem that has grown around it: frameworks, dev tools, the
                  community. Because of that passion of mine,I built{' '}
                  <Highlight to="projects">all sort of projects</Highlight> with
                  this language:
                </Text>
                <ul>
                  <ListItem>Web Applications</ListItem>
                  <ListItem>IoT</ListItem>
                  <ListItem>Mobile applications</ListItem>
                  <ListItem>Libraries</ListItem>
                </ul>
                <Text lineHeight={2} pb={3}>
                  I learn that the best way to learn is to{' '}
                  <Highlight>share knowledge</Highlight> with others. For that
                  reason, I start{' '}
                  <Highlight to="writing">writing post</Highlight> about the
                  latest technologies in Medium and also{' '}
                  <Highlight>do talks</Highlight> in local meetups.
                </Text>
                <Text lineHeight={2} pb={3}>
                  For me the <Highlight>Open Source</Highlight> philosophy was a{' '}
                  <Highlight>mind changing</Highlight> when I was learning to
                  code. Now, I tried to <Highlight>share</Highlight> any project
                  or piece of code I find it helpful, so everyone could avoid
                  doing the same I did. Also,{' '}
                  <Highlight>contributing</Highlight> to another projects is a
                  thing I love to do, I learned so much from reading a new
                  codebase.
                </Text>
              </Box> */}
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
