"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gatsbySourceFilesystem = require("gatsby-source-filesystem");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function onCreateNode(_x) {
  return _onCreateNode.apply(this, arguments);
}

function _onCreateNode() {
  _onCreateNode = _asyncToGenerator(function* ({
    node,
    cache,
    actions,
    store,
    createNodeId
  }) {
    let fileNode;
    const createNode = actions.createNode;

    if (node.internal.type === "InstagramContent") {
      try {
        fileNode = yield (0, _gatsbySourceFilesystem.createRemoteFileNode)({
          url: node.images.standard_resolution.url,
          store,
          cache,
          createNode,
          createNodeId
        });
      } catch (e) {
        console.log("ERROR: ", e);
      }
    }

    if (fileNode) {
      node.localImage___NODE = fileNode.id;
    }
  });
  return _onCreateNode.apply(this, arguments);
}

var _default = onCreateNode;
exports.default = _default;