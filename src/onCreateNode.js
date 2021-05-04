import { createRemoteFileNode } from "gatsby-source-filesystem"

async function onCreateNode({ node, cache, actions, store, createNodeId }) {
  let fileNode
  const { createNode } = actions
  if (node.internal.type === "InstagramContent") {
    const URL = node.media_type === "VIDEO" ? node.thumbnail_url : node.media_url
    try {
      fileNode = await createRemoteFileNode({
        url: URL,
        parentNodeId: node.id,
        store,
        cache,
        createNode,
        createNodeId,
      })
    } catch (e) {
      console.log("ERROR: ", e)
    }
  }
  if (fileNode) {
    node.localImage___NODE = fileNode.id
  }
}

export default onCreateNode
