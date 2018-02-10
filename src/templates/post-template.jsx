import React from 'react';
import ApplictionHelmet from '../components/Helmet';
import PostTemplateDetails from '../components/PostTemplateDetails';

const PostTemplate = props => {
  const { title, subtitle } = props.data.site.siteMetadata;
  const {
    title: postTitle,
    description: postDescription
  } = props.data.markdownRemark.frontmatter;
  const description = postDescription !== null ? postDescription : subtitle;

  return (
    <div>
      <ApplictionHelmet
        title={`${postTitle} - ${title}`}
        description={description}
      />
      <PostTemplateDetails {...props} />
    </div>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        author {
          name
          twitter
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date
        description
      }
    }
  }
`;
