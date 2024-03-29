module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin', 'react'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  rules: {
    '@typescript-eslint/ban-types': 'off',
    'no-console': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true,
      },
    ],
    'react/jsx-key': ['error'],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': process.env.STRICT_MODE === 'TRUE' ? 'error' : 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'const', next: 'export' },
      { blankLine: 'always', prev: 'if', next: 'return' },
    ],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-duplicate-enum-values': 'off',
    'react/no-children-prop': 'off',
  },
}
