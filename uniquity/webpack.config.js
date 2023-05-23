const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");

// Webpack hook in to expand the config from expo
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        //Unfortunately aws amplify react native is in beta so we need to do this to make it work.
        dangerouslyAddModulePathsToTranspile: ["@aws-amplify/ui-react-native"],
        // Need to include the rneui libraries and src directory
        include: [
          path.resolve(__dirname, "node_modules/@rneui/base"),
          path.resolve(__dirname, "node_modules/@rneui/themed"),
          path.resolve(__dirname, "node_modules/react-native-vector-icons"),
          path.resolve(__dirname, "node_modules/react-native-ratings"),
          path.resolve(__dirname, "src"),
        ],
      },
    },
    argv
  );
  return config;
};
