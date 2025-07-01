const baseConfig = require('./base.eslint.config.js');

module.exports = {
  ...baseConfig,
  extends: [...baseConfig.extends, 'plugin:@next/next/recommended'],
  plugins: [...baseConfig.plugins, '@next/next'],
  rules: {
    ...baseConfig.rules,
    '@next/next/no-html-link-for-pages': 'error',
    '@next/next/no-img-element': 'warn',
    '@next/next/no-sync-scripts': 'error',
    '@next/next/no-typos': 'error',
    '@next/next/no-unwanted-polyfillio': 'error',
    '@next/next/no-css-tags': 'error',
    '@next/next/no-head-element': 'error',
    '@next/next/no-page-custom-font': 'error',
    '@next/next/no-title-in-document-head': 'error',
    '@next/next/google-font-display': 'warn',
    '@next/next/google-font-preconnect': 'warn',
    '@next/next/next-script-for-ga': 'warn',
    '@next/next/no-document-import-in-page': 'error',
    '@next/next/no-head-import-in-document': 'error',
    '@next/next/no-script-component-in-head': 'error',
    '@next/next/no-before-interactive-script-outside-document': 'error',
    '@next/next/no-styled-jsx-in-document': 'error',
    'import/no-anonymous-default-export': 'off',
  },
  ignorePatterns: [...baseConfig.ignorePatterns, '.next/**', 'out/**'],
};
