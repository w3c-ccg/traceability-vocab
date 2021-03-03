module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: 0,
    'global-require': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'comma-dangle': 0,
  },
};
