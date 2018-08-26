import React from 'react';
import Section from '../components/Section';
import { Heading, Subhead, Image, Text, Flex, Box } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import { edgeToArray } from '../utils/contentful';
import styled from 'styled-components';
import { CardContainer, Card } from '../components/Card';
import SocialLink from '../components/SocialLink';
import Triangle from '../components/Background/Triangle';

const Background = () => (
  <div>
    <Triangle
      color="#ff4081"
      height={['80vh', '80vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="background"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      invertX
    />

    <Triangle
      color="#4b007d"
      height={['25vh', '40vh']}
      width={['75vw', '60vw']}
      invertX
      invertY
    />

    <Triangle
      color="#cecdfe"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
      invertY
    />
  </div>
);

const Title = styled(Subhead)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const ImageSubtitle = styled(Text)`
  position: relative;
  display: inline;
  top: -37px;
  left: 0;
  padding: 10px;
  padding-left: 20px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  float: right
  clip-path: polygon(20px 0%, 100% 0%, 100% 100%, 0% 100%);
`;

const Separator = styled.div`
  width: 4px;
  position: relative;
  background: ${props => props.theme.colors.secondary};
  top: 30px
  height: 140px;
  border-radius: 5px;
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
  <Card p={0}>
    <Flex css={{ height: '200px' }}>
      <Flex width="calc(100% - 200px)" flexDirection="column" p={2}>
        <span>
          <Title m={2} pb={1}>
            {name}
          </Title>
        </span>
        <Text p={2} width="100%">
          {description}
        </Text>
      </Flex>
      <Box width={'200px'} margin="auto">
        <Image
          src={logo.file.url}
          p={4}
          css={{
            height: '200px !important',
            width: '200px',
          }}
        />
        <ImageSubtitle bg="secondary">{type}</ImageSubtitle>
        <ImageSubtitle
          bg="secondary"
          style={{
            top: '-200px',
            float: 'left',
            clipPath: 'polygon(0 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)',
            padding: '10px',
            paddingRight: '20px',
          }}
        >
          {publishedDate}
        </ImageSubtitle>
        <Flex
          justifyContent="flex-end"
          css={{
            position: 'relative',
            top: '-237px',
            float: 'right',
            padding: '2px',
          }}
        >
          <SocialLink
            color="primary"
            hoverColor="primaryFaded"
            fontSize={5}
            mx={1}
            name="Check repository"
            page="github"
            link={repositoryUrl}
          />
          <SocialLink
            color="primary"
            hoverColor="primaryFaded"
            fontSize={5}
            mx={1}
            name="See project"
            page="globe"
            link={projectUrl}
          />
        </Flex>
      </Box>
    </Flex>
  </Card>
);

const Projects = (props, context) => {
  return (
    <Section.Container id="projects" Background={Background}>
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
                  publishedDate(formatString: "YYYY")
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
