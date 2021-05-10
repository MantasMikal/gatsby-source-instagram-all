import { createRemoteFileNode } from "gatsby-source-filesystem"

const createInstagramFileNode = async (node, store, cache, createNode, createNodeId) => {
  // Use the thumbnail for video
  const mediaUrl = node.media_type === "VIDEO" ? node.thumbnail_url : node.media_url
  let fileNode
  try {
    fileNode = await createRemoteFileNode({
      url: mediaUrl,
      parentNodeId: node.id,
      store,
      cache,
      createNode,
      createNodeId,
    })
  } catch (e) {
    console.log("ERROR: ", e)
  }

  if (fileNode) {
    node.localImage___NODE = fileNode.id
    node.localFile___NODE = fileNode.id
  }
}

async function onCreateNode({ node, cache, actions, store, createNodeId }) {
  const { createNode } = actions
  if (node.internal.type === "InstagramContent") {
    await createInstagramFileNode(node, store, cache, createNode, createNodeId)
    if (node.album && node.album.length > 0) {
      Promise.all(node.album.map(async albumNode => createInstagramFileNode(albumNode, store, cache, createNode, createNodeId)))
    }
  }
}

export default onCreateNode
