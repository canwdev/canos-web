/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  "rules": {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-async-promise-executor': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/no-mutating-props': 'off',
    'vue/no-unused-components': 'warn',
    'vue/no-setup-props-destructure': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    'vue/component-tags-order': [
      'error',
      {
        // order: [['script', 'template'], 'style'],
        order: ['script', 'template', 'style'],
      },
    ],
  }
}
