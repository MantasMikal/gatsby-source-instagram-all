# gatsby-source-instagram-api
Gatsby source plugin to fetch your ALL instagram media.

# Install
 1. ```yarn add gatsby-source-instagram-api```
 2. Add configuration to your gatsby-config.js
 ```
 {
      resolve: `gatsby-source-instagram-api`,
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
