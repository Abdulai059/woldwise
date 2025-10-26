module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // disable old React import requirement
  },
};
