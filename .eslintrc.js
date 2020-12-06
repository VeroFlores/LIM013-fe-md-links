module.exports = {
  env: {
    node: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],

  plugins: ['jest'],

  rules: {
    'linebreak-style': 0,
    'no-console': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
};
