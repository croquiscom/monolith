const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const baseConfig = require("./src/configs/base.eslint.config.js");
const reactRefresh = require("eslint-plugin-react-refresh");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.config(baseConfig),
  {
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
