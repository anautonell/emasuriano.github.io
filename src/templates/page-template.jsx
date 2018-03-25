import React from 'react';
import ApplictionHelmet from '../components/Helmet';
import PageTemplateDetails from '../components/PageTemplateDetails';

const PageTemplate = props => {
  const { title, subtitle } = props.data.site.siteMetadata;
  const page = props.data.markdownRemark;
  const { title: pageTitle, description: pageDescription } = page.frontmatter;
  const description = pageDescription !== null ? pageDescription : subtitle;

  return (
    <div>
      <ApplictionHelmet
        title={`${pageTitle} - ${title}`}
        description={description}
      />
      <PageTemplateDetails {...props} />
    </div>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
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
          linkedIn
          medium
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
      }
    }
  }
`;
