const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
  
    const blogPostTemplate = require.resolve(`./src/templates/blog-post.js`)
  
    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
            nodes {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
            }
        }
      }
    `)
  
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
    
    const posts = result.data.allMarkdownRemark.nodes

    if (posts.length > 0) {
        posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1]
        const next = index === 0 ? null : posts[index - 1]

        createPage({
            path: post.fields.slug,
            component: blogPostTemplate,
            context: {
            slug: post.fields.slug,
            previous,
            next,
            },
        })
     })
    }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })

        createNodeField({
        name: `slug`,
        node,
        value,
        })
    }
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    // Explicitly define the siteMetadata {} object
    // This way those will always be defined even if removed from gatsby-config.js

    // Also explicitly define the Markdown frontmatter
    // This way the "MarkdownRemark" queries will return `null` even when no
    // blog posts are stored inside "content/blog" instead of returning an error
    createTypes(`
        type SiteSiteMetadata {
        author: Author
        siteUrl: String
        social: Social
        }

        type Author {
        name: String
        summary: String
        }

        type Social {
        instagram: String
        }

        type MarkdownRemark implements Node {
        frontmatter: Frontmatter
        fields: Fields
        }

        type Frontmatter {
        title: String
        description: String
        date: Date @dateformat
        }

        type Fields {
        slug: String
        }
    `)
}