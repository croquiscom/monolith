module.exports = {
  extends: ['plugin:@nx/recommended'],
  plugins: ['@nx'],
  rules: {
    '@nx/enforce-module-boundaries': [
      'warn',
      {
        enforceBuildableLibDependency: true,
        allow: [],
        depConstraints: [
          {
            sourceTag: '*',
            onlyDependOnLibsWithTags: ['*'],
          },
        ],
      },
    ],
    '@nx/workspace-no-location-href-assign': 'error',
    '@nx/workspace-no-relative-imports': 'error',
    '@nx/workspace-no-circular-dependencies': 'error',
    '@nx/workspace-no-implicit-dependencies': 'error',
    '@nx/workspace-no-unused-dependencies': 'error',
  },
  ignorePatterns: [
    '.nx/**',
    'tmp/**',
    'dist/**',
    'node_modules/**',
    'coverage/**',
    '*.d.ts',
    '*.config.js',
    '*.config.ts',
  ],
};
