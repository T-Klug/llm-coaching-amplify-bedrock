module.exports = {
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    "react-hooks/rules-of-hooks": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unstable-nested-components": "off",
  },
  extends: ["@react-native-community", "eslint-config-prettier"],
};
