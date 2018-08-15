import React from 'react';
import Section from '../components/Section';
import { Heading, Subhead, Image, Text, Flex, Box } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import { edgeToArray } from '../utils/contentful';
import styled from 'styled-components';
import ReactHoverObserver from 'react-hover-observer';
import { CardContainer, Card } from '../components/Card';
import SocialLink from '../components/SocialLink';

const Title = styled(Subhead)`
  /* position: relative; */
  /* top: -37px; */
  /* margin-bottom: -37px; */
  /* left: 0; */
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.secondary} 5px solid;
`;

const ImageSubtitle = styled(Text)`
  position: relative;
  /* top: -37px;
  margin-bottom: -37px; */
  left: 0;
  padding: 10px 15px;
  border-radius: 0 0 20px 20px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Project = ({
  name,
  description,
  projectUrl,
  repositoryUrl,
  type,
  publishedDate,
  logo,
}) => (
  <Card bg="primaryFaded" p={2}>
    <ReactHoverObserver>
      {({ isHovering }) => (
        <Flex>
          <Box width={2 / 3} p={1}>
            <Title p={1} color="white">
              {name}
            </Title>
            <Text color="white" p={2}>
              {description}
            </Text>
            <Flex justifyContent="center" flexDirection="row" p={2}>
              <SocialLink
                color="secondary"
                fontSize={5}
                mx={1}
                page="github"
                link={repositoryUrl}
              />
              <SocialLink
                color="secondary"
                fontSize={5}
                mx={1}
                page="globe"
                link={projectUrl}
              />
            </Flex>
          </Box>
          <Box width={1 / 3}>
            <Image
              ratio={1}
              src={logo.file.url}
              bg="white"
              p={2}
              css={{ borderRadius: '20px 20px 0 0' }}
            />
            <ImageSubtitle bg="secondary">{type}</ImageSubtitle>
          </Box>
        </Flex>
      )}
    </ReactHoverObserver>
  </Card>
);

const Projects = (props, context) => {
  return (
    <Section name="projects">
      <Heading color="secondary">Projects</Heading>
      <StaticQuery
        query={graphql`
          query ProjectsQuery {
            allContentfulProject {
              edges {
                node {
                  id
                  name
                  description
                  projectUrl
                  repositoryUrl
                  publishedDate(formatString: "MMM - YYYY")
                  type
                  logo {
                    id
                    title
                    file {
                      url
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const projects = edgeToArray(data.allContentfulProject);
          return (
            <CardContainer>
              {projects.map(p => (
                <Project key={p.id} {...p} />
              ))}
            </CardContainer>
          );
        }}
      />
    </Section>
  );
};

export default Projects;
