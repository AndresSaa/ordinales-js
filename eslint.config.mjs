export default [
  {
    ignores: ['coverage/**', '.nyc_output/**', 'node_modules/**', 'docs/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'no-debugger': 'error',
    },
  },
]
