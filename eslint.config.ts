import antfu from '@antfu/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginAstro from 'eslint-plugin-astro'

export default antfu(
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'no-console': 1,
      'spaced-comment': 1,
      'antfu/if-newline': 0,
      'n/prefer-global/process': ['error', 'always'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
    },
  }
)