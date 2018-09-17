# gatsby-source-instagram-all
Gatsby source plugin to fetch ALL your instagram media using Instagram API + [Gatsby Image](https://www.gatsbyjs.org/packages/gatsby-image/) support.

# Install
 1. ```yarn add gatsby-source-instagram-all```
 2. Add configuration to your gatsby-config.js
 ```
 {
      resolve: `gatsby-source-instagram-all`,
      options: {
        access_token: "YOUR_ACCESS_TOKEN"
      }
 }
 ```
# Usage
Query data like this:

 ```
 query myQuery {
       allInstagramContent {
         edges {
           node {
            localImage{ 
              childImageSharp {
                fluid(maxHeight: 500, maxWidth: 500 quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
             images {
               standard_resolution {
                 url
               }
             }
           }
         }
       }
    }
 ```
 You can also get videos, comments, likes, tags etc. Read [Instagram API Docs](https://www.instagram.com/developer/endpoints/users/) for example response.
