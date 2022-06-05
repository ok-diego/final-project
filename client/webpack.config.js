// we need this to make dotenv work in webpack v5
// webpack is taking care bundling our app js files
const Dotenv = require("dotenv-webpack");

// export the dotenv-webpack plugin
module.exports = {
  plugins: [new Dotenv()],
};
