import React from 'react';
import Section from '../components/Section';
import { Heading, Text } from 'rebass';
import { edgeToArray } from '../utils/contentful';
import { StaticQuery, graphql } from 'gatsby';
import { CardContainer, Card } from '../components/Card';
import styled from 'styled-components';
import Triangle from '../components/Background/Triangle';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['15vh', '10vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="secondary"
      height={['50vh', '40vh']}
      width={['70vw', '40vw']}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={['40vh', '15vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const CoverImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const EllipsisHeading = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const ImageSubtitle = styled(Text)`
  position: relative;
  display: inline;
  float: right;
  padding: 10px;
  padding-left: 20px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  clip-path: polygon(20px 0%, 100% 0%, 100% 100%, 0% 100%);
`;

const Post = ({ title, text, image, url, date, time }) => {
  const timestamp = `${date} - ${Math.ceil(time)} min`;
  return (
    <Card
      onClick={() => window.open(url, '_blank')}
      css={{ cursor: 'pointer' }}
      p={0}
    >
      <EllipsisHeading m={3} p={1}>
        {title}
      </EllipsisHeading>
      <CoverImage src={image} height="200px" />
      <Text m={3}>{text}</Text>
      <ImageSubtitle textAlign="right" bg="secondaryLight">
        {timestamp}
      </ImageSubtitle>
    </Card>
  );
};

const parsePost = postFromGraphql => {
  const MEDIUM_CDN = 'https://cdn-images-1.medium.com/max/800';
  const MEDIUM_URL = 'https://medium.com';
  const {
    id,
    uniqueSlug,
    createdAt,
    title,
    virtuals,
    author,
  } = postFromGraphql;
  return {
    id,
    title,
    time: virtuals.readingTime,
    date: createdAt,
    text: virtuals.subtitle,
    image: `${MEDIUM_CDN}/${virtuals.previewImage.imageId}`,
    url: `${MEDIUM_URL}/${author.username}/${uniqueSlug}`,
  };
};

const Writing = (props, context) => {
  return (
    <Section.Container id="writing" Background={Background}>
      <Section.Header
        name="Writing - picked from Medium"
        icon="✍️"
        label="writing"
      />
      <StaticQuery
        query={graphql`
          query MediumPostQuery {
            allMediumPost(limit: 6, sort: { fields: createdAt, order: DESC }) {
              edges {
                node {
                  id
                  uniqueSlug
                  title
                  createdAt(formatString: "MMM YYYY")
                  virtuals {
                    subtitle
                    readingTime
                    previewImage {
                      imageId
                    }
                  }
                  author {
                    username
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const posts = edgeToArray(data.allMediumPost).map(parsePost);
          return (
            <CardContainer minWidth="300px">
              {posts.map(p => (
                <Post key={p.id} {...p} />
              ))}
            </CardContainer>
          );
        }}
      />
    </Section.Container>
  );
};

export default Writing;
