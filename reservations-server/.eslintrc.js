module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto', singleQuote: true }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: 'req|res|next|val' },
    ],
    '@typescript-eslint/no-explicit-any': [
      'error',
      { argsIgnorePattern: 'error|err|e|' },
    ],
    'import/extensions': 'off',
    'import/no-unresolved': 'error',
    // note you must disable the base rule as it can report incorrect errors
    'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }],
    'no-console': 'off',
    'func-names': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id', '_next'] }],
    'prefer-destructuring': ['error', { object: true, array: false }],
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

        // use <root>/path/to/folder/tsconfig.json
        project: './tsconfig.json',
      },
    },
  },
};
