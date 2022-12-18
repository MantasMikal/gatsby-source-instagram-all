import { createRemoteFileNode } from "gatsby-source-filesystem"

const createInstagramFileNode = async (node, getCache, createNode, createNodeId) => {
  // Use the thumbnail for video
  const mediaUrl = node.media_type === "VIDEO" ? node.thumbnail_url : node.media_url
  let fileNode
  try {
    fileNode = await createRemoteFileNode({
      url: mediaUrl,
      parentNodeId: node.id,
      getCache,
      createNode,
      createNodeId,
    })
  } catch (e) {
    console.error(e)
  }

  if (fileNode) {
    node.localImage___NODE = fileNode.id // TODO: remove in the future
    node.localFile___NODE = fileNode.id
  }
}

// Create local file node for images and albums
const createInstagramNode = async (node, getCache, createNode, createNodeId) => {
  if (node.internal.type === "InstagramContent") {
    await createInstagramFileNode(node, getCache, createNode, createNodeId)
    if (node.album && node.album.length > 0) {
      await Promise.all(
        node.album.map(async (albumNode) => createInstagramFileNode(albumNode, getCache, createNode, createNodeId))
      )
    }
  }
}

export default createInstagramNode
