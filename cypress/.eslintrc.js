/* eslint-env node */

module.exports = {
  extends: ['../.eslintrc.js', 'plugin:cypress/recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['cypress', 'no-only-tests'],
  rules: {
    'no-only-tests/no-only-tests': 'error',
  },
  env: {
    node: true,
    'cypress/globals': true,
  },
}
