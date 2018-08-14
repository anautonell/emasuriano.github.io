import React from 'react';
import Section from '../components/Section';
import { Heading, Box, Card, Subhead, Image, Text } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import { edgeToArray } from '../utils/contentful';
import styled from 'styled-components';
import ReactHoverObserver from 'react-hover-observer';

const ProjectContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
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
  <ReactHoverObserver>
    {({ isHovering }) => (
      <Box width={300} height={300}>
        <Card bg="primaryFaded" p={2}>
          <Image
            ratio={1}
            src={logo.file.url}
            bg="white"
            p={2}
            css={{ borderRadius: '0 0 20px 20px' }}
          />
          <Title p={2}>{name}</Title>
          {isHovering && <Text>{description}</Text>}
        </Card>
      </Box>
    )}
  </ReactHoverObserver>
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
          const projects = edgeToArray(data.allContentfulProject);
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
