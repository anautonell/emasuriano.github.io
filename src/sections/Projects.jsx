import React from 'react';
import Section from '../components/Section';
import { Subhead, Image, Text, Flex, Box } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import { edgeToArray } from '../utils/contentful';
import styled from 'styled-components';
import { CardContainer, Card } from '../components/Card';
import SocialLink from '../components/SocialLink';
import Triangle from '../components/Background/Triangle';
import MediaQuery from 'react-responsive';

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
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
      color="primaryDark"
      height={['25vh', '40vh']}
      width={['75vw', '60vw']}
      invertX
      invertY
    />

    <Triangle
      color="backgroundDark"
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
  float: right;
  clip-path: polygon(20px 0%, 100% 0%, 100% 100%, 0% 100%);
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
    <MediaQuery minDeviceWidth={400}>
      {matches => {
        const width = matches ? '200px' : '100px';
        return (
          <Flex css={{ height: '200px' }}>
            <Flex width={`calc(100% - ${width})`} flexDirection="column" p={2}>
              <span>
                <Title m={2} pb={1}>
                  {name}
                </Title>
              </span>
              <Text p={2} width="100%">
                {description}
              </Text>
            </Flex>
            <Box width={width} margin="auto">
              <Image
                src={logo.file.url}
                p={matches ? 4 : 2}
                css={{
                  height: `${width} !important`,
                  width,
                  marginTop: matches ? '0px' : '50px',
                }}
              />
              <ImageSubtitle
                bg="primaryLight"
                color="white"
                style={{
                  top: matches ? '-37px' : '13px',
                }}
              >
                {type}
              </ImageSubtitle>
              {matches && (
                <ImageSubtitle
                  bg="backgroundDark"
                  style={{
                    top: '-200px',
                    float: 'left',
                    clipPath:
                      'polygon(0 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)',
                    padding: '10px',
                    paddingRight: '20px',
                  }}
                >
                  {publishedDate}
                </ImageSubtitle>
              )}
              <Flex
                justifyContent="flex-end"
                css={{
                  position: 'relative',
                  top: matches ? '-237px' : '-187px',
                  float: 'right',
                  padding: '2px',
                }}
              >
                <SocialLink
                  color="primary"
                  hoverColor="primaryLight"
                  fontSize={5}
                  mx={1}
                  name="Check repository"
                  page="github"
                  link={repositoryUrl}
                />
                <SocialLink
                  color="primary"
                  hoverColor="primaryLight"
                  fontSize={5}
                  mx={1}
                  name="See project"
                  page="globe"
                  link={projectUrl}
                />
              </Flex>
            </Box>
          </Flex>
        );
      }}
    </MediaQuery>
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
