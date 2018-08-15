import React from 'react';
import Section from '../components/Section';
import { Heading, Box, Text } from 'rebass';
import { edgeToArray } from '../utils/contentful';
import { StaticQuery, graphql } from 'gatsby';
import { CardContainer, Card } from '../components/Card';
import styled from 'styled-components';

const CoverImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const EllipsisHeading = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Post = ({ title, text, image, url, date, time }) => (
  <Card
    onClick={() => window.open(url, '_blank')}
    css={{ cursor: 'pointer' }}
    p={20}
  >
    <EllipsisHeading mb={3}>{title}</EllipsisHeading>
    <CoverImage src={image} height="200px" />
    <Text mt={3}>{text}</Text>
    <Text color="grey" mt={3} textAlign="right">{`${date} - ${Math.ceil(
      time,
    )} min`}</Text>
  </Card>
);

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
    <Section name="writing">
      <Heading color="secondary" mb={3}>
        Writing ✍️
      </Heading>
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
            <CardContainer>
              {posts.map(p => (
                <Post key={p.id} {...p} />
              ))}
            </CardContainer>
          );
        }}
      />
    </Section>
  );
};

export default Writing;
