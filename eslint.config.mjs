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
            // Custom regex for PascalCase with underscores before each capital letter except the first
            format: null,
            custom: {
              regex: '^[A-Z][a-z0-9]+(_[A-Z][a-z0-9]+)*$',
              match: true,
            },
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
