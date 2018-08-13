module.exports = {
  siteMetadata: {
    url: 'https://emasuriano.com',
    name: 'Ema Suriano',
    roles: ['Web Developer', 'Open-Source Enthusiast', 'Writer', 'Speaker'],
    socialLinks: [
      {
        page: 'twitter',
        link: 'https://twitter.com/emasuriano'
      },
      { page: 'github', link: 'http://github.com/EmaSuriano' },
      {
        page: 'envelope',
        link: 'https://emanuelsuriano.typeform.com/to/OeETl6'
      },
      { page: 'medium', link: 'https://medium.com/@emasuriano' },
      {
        page: 'linkedin',
        link: 'https://www.linkedin.com/in/emanuel-suriano/'
      }
    ]
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-resolve-src',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`cabin`, `Open Sans`]
      }
    }
  ]
};
