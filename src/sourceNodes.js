import crypto from "crypto"
import fetch from "node-fetch"
import queryString from "query-string"
import createInstagramNode from "./createInstagramNode"

async function sourceNodes({ actions, createNodeId, getCache }, configOptions) {
  const { createNode } = actions
  delete configOptions.plugins
  const apiOptions = queryString.stringify(configOptions)
  const apiUrl = `https://graph.instagram.com/me/media?\
  fields=id,media_url,media_type,permalink,timestamp,caption,username,thumbnail_url,children{id,media_url,media_type,thumbnail_url,timestamp}\
  &${apiOptions}\
  &limit=30
  `

  // Helper function to fetch and parse data to JSON
  const fetchAndParse = async (api) => {
    const data = await fetch(api)
    const response = await data.json()

    return response
  }

  // Recursively get data from Instagram api
  const getData = async (url, data = []) => {
    let response = await fetchAndParse(url)
    if (response.error !== undefined) {
      console.error("\nINSTAGRAM API ERROR: ", response.error.message)
      return data
    }
    data = data.concat(response.data)
    let next_url = response?.paging?.next

    if (next_url) {
      return getData(next_url, data)
    }

    return data
  }

  // Create nodes
  const createNodes = async (API) => {
    const data = await getData(API).then((res) => res)
    for (const item of data) {
      if (item.id !== undefined && ["IMAGE", "CAROUSEL_ALBUM", "VIDEO"].includes(item.media_type)) {
        const nodeData = await processMedia(item)
        createNode(nodeData)
      }
    }
  }

  // Processes a media to match Gatsby's node structure
  const processMedia = async (media) => {
    media.album = media.children && media.children.data.length && media.children.data.map((node) => node)
    const nodeId = createNodeId(`instagram-media-${media.id}`)
    const nodeContent = JSON.stringify(media)
    const nodeContentDigest = crypto.createHash("md5").update(nodeContent).digest("hex")

    const nodeData = Object.assign({}, media, {
      id: nodeId,
      media_id: media.id,
      parent: null,
      children: [],
      internal: {
        type: `InstagramContent`,
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
    })

    // Create local image node
    await createInstagramNode(nodeData, getCache, createNode, createNodeId)

    return nodeData
  }

  return createNodes(apiUrl)
}
export default sourceNodes
