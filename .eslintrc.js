module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    'prettier/react'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    "import/extensions": ["error", 'never', { "json": "always" }],
    "import/no-unresolved": [0],
    "arrow-body-style": ["error", "always"],
    "require-await": 'error',
    "no-return-await": [0],
    "no-restricted-syntax": [0],
    "no-param-reassign": ["error", { "props": false }],
    "react/jsx-filename-extension": [1, { "extensions": ['.ts', '.tsx'] }],
    "react/jsx-props-no-spreading": [0],
    "react/prop-types": [0]
  }
}
