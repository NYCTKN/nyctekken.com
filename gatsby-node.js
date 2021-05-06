const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
  
    const postTemplate = require.resolve(`./src/templates/post-template.js`)
    const eventTemplate = require.resolve(`./src/templates/event-template.js`)

    const allPosts = await graphql(`
      {
        allMarkdownRemark(
          filter: {fileAbsolutePath: {regex: "/posts/"}}
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
    if (allPosts.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query for your posts.`)
      return
    }
    
    const posts = allPosts.data.allMarkdownRemark.nodes

    if (posts.length > 0) {
        posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1]
        const next = index === 0 ? null : posts[index - 1]

        createPage({
            path: post.fields.slug,
            component: postTemplate,
            context: {
            slug: post.fields.slug,
            previous,
            next,
            },
        })
     })
    }

    const allEvents = await graphql(`
    {
      allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/events/"}}
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
  if (allEvents.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query your events.`)
    return
  }
  
  const events = allEvents.data.allMarkdownRemark.nodes

  if (events.length > 0) {
      events.forEach((event, index) => {
      const previous = index === events.length - 1 ? null : events[index + 1]
      const next = index === 0 ? null : events[index - 1]

      createPage({
          path: event.fields.slug,
          component: eventTemplate,
          context: {
            slug: event.fields.slug,
            previous,
            next,
          },
      })
   })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark` && node.fileAbsolutePath.includes("posts")) {
        const slug = createFilePath({ node, getNode, basePath: `content/posts` })

        createNodeField({
        name: `slug`,
        node,
        value: `/posts${slug}`,
        })
    }

    if (node.internal.type === `MarkdownRemark` && node.fileAbsolutePath.includes("events")) {
        const slug = createFilePath({ node, getNode, basePath: `content/posts` })

        createNodeField({
        name: `slug`,
        node,
        value: `/events${slug}`,
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