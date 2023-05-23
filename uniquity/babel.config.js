module.exports = function (api) {
  api.cache(true);
  return {
    // Base babel expo react-native
    presets: ["babel-preset-expo"],
    // For rneui
    plugins: ["@babel/plugin-proposal-class-properties"],
  };
};
