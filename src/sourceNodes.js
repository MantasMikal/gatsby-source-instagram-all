import crypto from "crypto"
import fetch from "node-fetch"
import queryString from "query-string"

async function sourceNodes({
  actions,
  createNodeId
}, configOptions){
  const {
    createNode
  } = actions

  delete configOptions.plugins
  const apiOptions = queryString.stringify(configOptions)
  const apiUrl = `https://api.instagram.com/v1/users/self/media/recent/?${apiOptions}&count=30`

  //Helper Function to fetch and parse data to JSON
  const fetchAndParse = async (api) => {
    const data = await fetch(api);
    const response = await data.json();

    return response;
  }
  //Helper to recursiveley get data from Instagram api
  const getData = async (url, data = []) => {
    let response = await fetchAndParse(url);
    //Premature error handling
    if (response.code !== 200) {
      console.error('\nINSTAGRAM API ERROR: ', response.error_message);
      return data
    }

    data = data.concat(response.data)
    let next_url = response.pagination.next_url;

    if (next_url !== undefined) {
      return getData(next_url, data)
    }

    return data
  }

  //Creates nodes
  const createNodes = async (API) => {
    await getData(API).then(res => {
      res.forEach(item => {
        if (item.id !== undefined) {
          const nodeData = processPhoto(item)
          createNode(nodeData)
        }
      })
    })
  }

  // Helper function that processes a photo to match Gatsby's node structure
  const processPhoto = photo => {
    const nodeId = createNodeId(`instagram-photo-${photo.id}`)
    const nodeContent = JSON.stringify(photo)
    const nodeContentDigest = crypto
      .createHash("md5")
      .update(nodeContent)
      .digest("hex")

    const nodeData = Object.assign({}, photo, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `InstagramContent`,
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
    })

    return nodeData
  }
  return (
    createNodes(apiUrl)
  )
}
export default sourceNodes