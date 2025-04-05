import antfu from '@antfu/eslint-config'
import eslintPluginAstro from 'eslint-plugin-astro'

export default antfu(
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
      'style/spaced-comment': 'error',
      'antfu/if-newline': 'off',
      'n/prefer-global/process': ['error', 'always'],
      'style/quotes': ['error', 'single', { avoidEscape: true }],
      'style/eol-last': ['error', 'always'],
      'style/jsx-one-expression-per-line': 'off',
      'style/indent': ['error', 2, { SwitchCase: 1 }],
    },
  },
)
