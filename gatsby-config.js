module.exports = {
  siteMetadata: {
    title: `Jingle Jam 2019`,
    description: `Interactive schedule featuring: Automatic time zone conversion for stream times & dates; Countdowns for all streams; Twitch and YouTube VODs for each stream when they become available; and Creators hosting/featuring listed for each stream`,
    author: `@ryanoconr`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `jinglejam`,
        short_name: `jinglejam`,
        start_url: `/`,
        background_color: `#081633`,
        theme_color: `#081633`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
