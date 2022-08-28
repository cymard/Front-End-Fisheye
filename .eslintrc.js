module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-return-assign': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off'
  }
}
