module.exports = {
  plugins: ['@nx'],
  rules: {
    '@nx/enforce-module-boundaries': [
      'error',
      {
        enforceBuildableLibDependency: true,
        allow: [],
        depConstraints: [
          { sourceTag: '*', onlyDependOnLibsWithTags: ['*'] },
          {
            sourceTag: 'scope:util',
            onlyDependOnLibsWithTags: [],
          },
          {
            sourceTag: 'scope:feature',
            onlyDependOnLibsWithTags: ['scope:util'],
          },
        ],
      },
    ],
    '@nx/workspace-enforce-button-loading': 'error',
    '@nx/workspace-no-location-href-assign': 'error',
    '@nx/workspace-no-unsafe-mutation-with-barcode': 'warn',
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        '@nx/workspace-enforce-button-loading': 'error',
      },
    },
  ],
};
