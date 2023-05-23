const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ["@aws-amplify/ui-react-native"],
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
