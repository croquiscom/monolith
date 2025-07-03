const baseConfig = require('./src/configs/base.eslint.config.js');

module.exports = {
  ...baseConfig,
  plugins: [...baseConfig.plugins, 'react-refresh'],
  rules: {
    ...baseConfig.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
