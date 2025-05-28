import reactConfig from '@croquiscom/eslint-config/react.js';

export default [
  ...reactConfig,
  {
    ignores: ['dist', 'build', 'coverage', 'node_modules'],
  },
];
