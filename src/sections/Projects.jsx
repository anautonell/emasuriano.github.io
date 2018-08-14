import React from 'react';
import Section from '../components/Section';
import { Heading, Box, Card, Subhead, BackgroundImage, Text } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import { getContentfulArray } from '../utils/contentful';
import styled from 'styled-components';

const ProjectContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const Title = styled(Subhead)`
  position: relative;
  top: -37px;
  margin-bottom: -37px;
  left: 0;
  background: ${props => props.theme.colors.secondary};
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
`;

const Project = ({
  name,
  description,
  projectUrl,
  repositoryUrl,
  publishedDate,
  logo,
}) => (
  <Box>
    <Card bg="primaryFaded">
      <BackgroundImage ratio={1} src={logo.file.url} />
      <Title p={2}>Library</Title>
      <Subhead>{name}</Subhead>
      <Text>{description}</Text>
    </Card>
  </Box>
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
          const projects = getContentfulArray(data.allContentfulProject);
          return (
            <ProjectContainer>
              {projects.map(p => (
                <Project key={p.id} {...p} />
              ))}
              {projects.map(p => (
                <Project key={p.id} {...p} />
              ))}
            </ProjectContainer>
          );
        }}
      />
    </Section>
  );
};

export default Projects;
