import React from 'react';
import Section from '../components/Section';
import { Heading } from 'rebass';
import { edgeToArray } from '../utils/contentful';
import { StaticQuery, graphql } from 'gatsby';

const Post = ({ title, text, image, url }) => (
  <div>
    <h1>{title}</h1>
    <p>{title}</p>
    <img src={image} />
    <p>{url}</p>
  </div>
);

const parsePost = postFromGraphql => {
  const MEDIUM_CDN = 'https://cdn-images-1.medium.com/max/800';
  const MEDIUM_URL = 'https://medium.com';
  const { id, uniqueSlug, title, virtuals, author } = postFromGraphql;
  return {
    id,
    title,
    text: virtuals.subtitle,
    image: `${MEDIUM_CDN}/${virtuals.previewImage.imageId}`,
    url: `${MEDIUM_URL}/${author.username}/${uniqueSlug}`,
  };
};

const Writing = (props, context) => {
  return (
    <Section name="writing">
      <Heading color="secondary">Writing</Heading>
      <StaticQuery
        query={graphql`
          query MediumPostQuery {
            allMediumPost {
              edges {
                node {
                  id
                  uniqueSlug
                  title
                  virtuals {
                    subtitle
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
          console.log(posts);
          return (
            <div>
              {posts.map(p => (
                <Post key={p.id} {...p} />
              ))}
            </div>
          );
        }}
      />
    </Section>
  );
};

export default Writing;
