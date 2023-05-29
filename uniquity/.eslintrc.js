module.exports = {
  // Eslint and prettieer setup
  parserOptions: {
    requireConfigFile: false,
  },
  // Irrelevant rules to turn off
  rules: {
    "react-hooks/rules-of-hooks": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unstable-nested-components": "off",
    "react-native/no-inline-styles": "off",
    "eslint-comments/no-unlimited-disable": "off",
    "eslint-comments/no-unused-disable": "off",
    "no-alert": "off",
  },
  // Extend the rulesets of react native and eslint prettier
  extends: ["@react-native-community", "eslint-config-prettier"],
};
