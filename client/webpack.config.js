// we need this to make dotenv work in webpack v5
// webpack is taking care of processing and bundling our js files so the browser can read it
const Dotenv = require("dotenv-webpack");

// export the dotenv-webpack plugin
module.exports = {
  plugins: [new Dotenv()],
};
