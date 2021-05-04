⚛️📸 Gatsby source plugin to fetch ALL your instagram media from Instagram API + [Gatsby Image](https://www.gatsbyjs.com/plugins/gatsby-plugin-image) support.

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
 👓 Watch [this video](https://www.youtube.com/watch?v=X2ndbJAnQKM) if you're having trouble generating your access token.


# How to use
Query data like this:

 ```
query myQuery {
  allInstagramContent {
    edges {
      node {
        caption
        media_url
        localImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
    }
  }
}

 ```
## Graphql fields
Field Name | Description
-- | --
caption | The Media's caption text
localImage | The local image.
id | The Media's ID.
media_type | The Media's type. Can be IMAGE, VIDEO, or CAROUSEL_ALBUM.
media_url | The Media's URL.
permalink | The Media's permanent URL. Will be omitted if the Media contains copyrighted material, or has been flagged for a copyright violation.
thumbnail_url | The Media's thumbnail image URL. Only available on VIDEO Media.
timestamp | The Media's publish date in ISO 8601 format.
username | The Media owner's username.

## Plugin Options

Option | Type | Description
-- | -- | --
access_token | string | Your access token
max_id | string (optional) | Option to return media earlier than, but not including, this max_id
min_id | string (optional) | Option to return media later than, and including, this min_id

## Contribute

1. [Fork it](https://github.com/MantasMikal/gatsby-source-instagram-al/fork)
2. Create your feature branch `git checkout -b feature/fooBar`
3. Commit your changes `git commit -am 'Add some fooBar'`
4. Push to the branch `git push origin feature/fooBar`
5. Create a new Pull Request
