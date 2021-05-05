module.exports = {
  siteMetadata: {
    title: "nyctekken.com",
    author: {
      name: `NYC TKN Team`,
      summary: `Designed and developed by @harsimus`,
    },
    description: "The TEKKEN community of New York City and the tri-state area.",
    siteUrl: "https://nyctekken.com",
    social: {
      twitter: 'nyctekken',
    },
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/nyctkn-favicon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    `gatsby-transformer-remark`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/event`,
        name: `event`,
      },
    },
  ],
};
