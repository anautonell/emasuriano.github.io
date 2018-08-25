import React from 'react';
import Section from '../components/Section';
import { Heading, Subhead, Image, Text, Flex, Box } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import { edgeToArray } from '../utils/contentful';
import styled from 'styled-components';
import { CardContainer, Card } from '../components/Card';
import SocialLink from '../components/SocialLink';

const Title = styled(Subhead)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.secondary} 5px solid;
`;

const ImageSubtitle = styled(Text)`
  position: relative;
  display: inline;
  top: -28px;
  left: 0;
  padding: 10px;
  padding-right: 30px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  clip-path: polygon(0 0, 0 100%, 100% 100%, 75% 0%);
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
  <Card bg="primaryFaded" p={2} css={{ height: '200px' }}>
    <Flex>
      <Flex
        width="calc(100% - 160px)"
        p={1}
        flexDirection="column"
        justifyContent="space-between"
      >
        <span>
          <Title p={1} color="white">
            {name}
          </Title>
        </span>
        <Text color="white" p={2} width="100%">
          {description}
        </Text>
        <Flex p={2} justifyContent="flex-end">
          <SocialLink
            color="secondary"
            hoverColor="secondaryVariant"
            fontSize={5}
            mx={1}
            page="github"
            link={repositoryUrl}
          />
          <SocialLink
            color="secondary"
            hoverColor="secondaryVariant"
            fontSize={5}
            mx={1}
            page="globe"
            link={projectUrl}
          />
        </Flex>
      </Flex>
      <Box width={'200px'} margin="auto">
        <Image
          src={logo.file.url}
          bg="white"
          p={3}
          css={{ height: '183px !important', width: '183px' }}
        />
        <ImageSubtitle bg="secondary">{type}</ImageSubtitle>
      </Box>
    </Flex>
  </Card>
);

const Projects = (props, context) => {
  return (
    <Section.Container id="projects">
      <Section.Header name="Projects" icon="💻" label="notebook" />
      <StaticQuery
        query={graphql`
          query ProjectsQuery {
            allContentfulProject(sort: { fields: publishedDate, order: DESC }) {
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
            <CardContainer minWidth="400px">
              {projects.map(p => (
                <Project key={p.id} {...p} />
              ))}
            </CardContainer>
          );
        }}
      />
    </Section.Container>
  );
};

export default Projects;
