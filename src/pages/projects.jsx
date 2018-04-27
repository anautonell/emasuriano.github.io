import React from 'react';
import ApplictionHelmet from '../components/Helmet';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';

const ProjectRoute = props => {
  const { title, subtitle } = props.data.site.siteMetadata;
  const posts = props.data.allMarkdownRemark.edges;
  const items = posts.map(post => (
    <Post data={post} key={post.node.fields.slug} />
  ));

  return (
    <div>
      <ApplictionHelmet title={title} description={subtitle} />
      <Sidebar {...props} />
      <div className="content">
        <div className="content__inner">{items}</div>
      </div>
    </div>
  );
};

export default ProjectRoute;

export const pageQuery = graphql`
  query ProjectsQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          twitter
          github
          medium
          linkedIn
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: { layout: { eq: "project" }, draft: { ne: true } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;
