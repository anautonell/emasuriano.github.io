import React from 'react';
import { Subhead, Image, Text, Flex, Box, Label } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import Section from '../components/Section';
import { edgeToArray } from '../utils/contentful';
import { CardContainer, Card } from '../components/Card';
import SocialLink from '../components/SocialLink';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';

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

const getWindow = () => typeof window !== 'undefined' && window;

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
    <MediaQuery
      minWidth={400}
      values={{ ...(!getWindow() && { deviceWidth: 300 }) }}
    >
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
                src={logo.image.src}
                alt={logo.title}
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
                top={matches ? '-37px' : '13px'}
              >
                {type}
              </ImageSubtitle>
              {matches && (
                <ImageSubtitle bg="backgroundDark" top="-200px" invert="true">
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
                <Label mx={1} fontSize={5}>
                  <SocialLink
                    color="primary"
                    hoverColor="primaryLight"
                    name="Check repository"
                    fontAwesomeIcon="github"
                    url={repositoryUrl}
                  />
                </Label>
                <Label mx={1} fontSize={5}>
                  <SocialLink
                    color="primary"
                    hoverColor="primaryLight"
                    fontSize={5}
                    mx={1}
                    name="See project"
                    fontAwesomeIcon="globe"
                    url={projectUrl}
                  />
                </Label>
              </Flex>
            </Box>
          </Flex>
        );
      }}
    </MediaQuery>
  </Card>
);

const Projects = () => (
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
                  title
                  image: resize(width: 200, quality: 100) {
                    src
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

export default Projects;
