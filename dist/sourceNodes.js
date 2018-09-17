"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _queryString = _interopRequireDefault(require("query-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function sourceNodes(_x, _x2) {
  return _sourceNodes.apply(this, arguments);
}

function _sourceNodes() {
  _sourceNodes = _asyncToGenerator(function* ({
    actions,
    createNodeId
  }, configOptions) {
    const createNode = actions.createNode;
    delete configOptions.plugins;

    const apiOptions = _queryString.default.stringify(configOptions);

    const apiUrl = `https://api.instagram.com/v1/users/self/media/recent/?${apiOptions}&count=30`; //Helper Function to fetch and parse data to JSON

    const fetchAndParse =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (api) {
        const data = yield (0, _nodeFetch.default)(api);
        const response = yield data.json();
        return response;
      });

      return function fetchAndParse(_x3) {
        return _ref.apply(this, arguments);
      };
    }(); //Helper to recursiveley get data from Instagram api


    const getData =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (url, data = []) {
        let response = yield fetchAndParse(url); //Premature error handling

        if (response.meta.code !== 200) {
          console.error('\nINSTAGRAM API ERROR: ', response.meta.error_message);
          return data;
        }

        data = data.concat(response.data);
        let next_url = response.pagination.next_url;

        if (next_url !== undefined) {
          return getData(next_url, data);
        }

        return data;
      });

      return function getData(_x4) {
        return _ref2.apply(this, arguments);
      };
    }(); //Creates nodes


    const createNodes =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(function* (API) {
        yield getData(API).then(res => {
          res.forEach(item => {
            if (item.id !== undefined) {
              const nodeData = processPhoto(item);
              createNode(nodeData);
            }
          });
        });
      });

      return function createNodes(_x5) {
        return _ref3.apply(this, arguments);
      };
    }(); // Helper function that processes a photo to match Gatsby's node structure


    const processPhoto = photo => {
      const nodeId = createNodeId(`instagram-photo-${photo.id}`);
      const nodeContent = JSON.stringify(photo);

      const nodeContentDigest = _crypto.default.createHash("md5").update(nodeContent).digest("hex");

      const nodeData = Object.assign({}, photo, {
        id: nodeId,
        parent: null,
        children: [],
        internal: {
          type: `InstagramContent`,
          content: nodeContent,
          contentDigest: nodeContentDigest
        }
      });
      return nodeData;
    };

    return createNodes(apiUrl);
  });
  return _sourceNodes.apply(this, arguments);
}

var _default = sourceNodes;
exports.default = _default;