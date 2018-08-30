module.exports = {
  siteMetadata: {
    url: 'https://emasuriano.com',
    name: 'Ema Suriano',
    roles: ['Web Developer', 'Open-Source Enthusiast', 'Writer'],
    socialLinks: [
      {
        name: 'Twitter',
        page: 'twitter',
        link: 'https://twitter.com/emasuriano',
      },
      {
        name: 'GitHub',
        page: 'github',
        link: 'http://github.com/EmaSuriano',
      },
      {
        name: 'Contact me',
        page: 'envelope',
        link: 'https://emanuelsuriano.typeform.com/to/OeETl6',
      },
      {
        name: 'Medium',
        page: 'medium',
        link: 'https://medium.com/@emasuriano',
      },
      {
        name: 'LinkedIn',
        page: 'linkedin',
        link: 'https://www.linkedin.com/in/emanuel-suriano/',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'EmaSuriano',
        short_name: 'EmaSuriano',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#02a3ee',
        display: 'minimal-ui',
        icon: 'favicons/1.png',
      },
    },
    'gatsby-plugin-styled-components',
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
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-124973846-1',
        head: true,
      },
    },
    'gatsby-plugin-offline',
  ],
};
