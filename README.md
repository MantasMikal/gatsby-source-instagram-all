## THIS PLUGIN WILL STOP WORKING ON March 31st, 2020
https://www.instagram.com/developer/


⚛️📸 Gatsby source plugin to fetch ALL your instagram media from Instagram API + [Gatsby Image](https://www.gatsbyjs.org/packages/gatsby-image/) support.

[![Demo](https://i.imgur.com/xHgFi3A.png)](https://github.com/MantasMikal/gatsby-instagram)

# Install
 1. ```yarn add gatsby-source-instagram-all```
 2. Add this configuration to your gatsby-config.js:
 ```
 {
      resolve: `gatsby-source-instagram-all`,
      options: {
        access_token: "YOUR_ACCESS_TOKEN"
      }
 }
 ```
 👓 A quick way to get your [access token](http://instagram.pixelunion.net/)
# How to use
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

 ## Plugin Options

Option | Type | Description
-- | -- | --
access_token | string | Your access token
max_id | string (optional) | Option to return media earlier than, but not including, this max_id
min_id | string (optional) | Option to return media later than, and including, this min_id

