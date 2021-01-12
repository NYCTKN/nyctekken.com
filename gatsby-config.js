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
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
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
  ],
};
