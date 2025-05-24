import antfu from '@antfu/eslint-config'

export default antfu(
  {
    typescript: {
      tsconfigPath: 'tsconfig.json',
      overrides: {
        'ts/naming-convention': [
          'warn',
          {
            selector: 'default',
            format: ['snake_case'],
          },
          {
            selector: ['typeLike', 'import'],
            format: ['PascalCase'],
          },
        ],
      },
    },
    astro: true,
  },
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
