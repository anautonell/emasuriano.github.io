module.exports = {
  siteMetadata: {
    url: 'https://emasuriano.com',
    name: 'Ema Suriano',
    roles: ['Web Developer', 'Open-Source Enthusiast', 'Writer'],
    socialLinks: [
      {
        page: 'twitter',
        link: 'https://twitter.com/emasuriano',
      },
      { page: 'github', link: 'http://github.com/EmaSuriano' },
      {
        page: 'envelope',
        link: 'https://emanuelsuriano.typeform.com/to/OeETl6',
      },
      { page: 'medium', link: 'https://medium.com/@emasuriano' },
      {
        page: 'linkedin',
        link: 'https://www.linkedin.com/in/emanuel-suriano/',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-resolve-src',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`cabin`, `Open Sans`],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `5scdtcm7a1zr`,
        accessToken: `3fac22c51aed56369f51320e09f4bfe6eab46f899c80d993231e52b72997f618`,
      },
    },
    {
      resolve: `gatsby-source-medium`,
      options: {
        username: `@emasuriano`,
      },
    },
    'gatsby-transformer-remark',
  ],
};
