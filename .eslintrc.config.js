module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'airbnb',
  ],
  plugins: ['prettier', 'react'],
  rules: {
    'prettier/prettier': ['error'],
  },
}
