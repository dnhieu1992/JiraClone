/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: [
    '**/node_modules/**',
    '**/.next/**',
    '**/dist/**',
    '**/build/**',
    '**/coverage/**',
    '**/.turbo/**',
    // Config files - không cần ESLint check, chỉ cần Prettier format
    '**/.eslintrc.*',
    '**/.lintstagedrc.*',
    '**/next.config.*',
    '**/jest.config.*',
    '**/tailwind.config.*',
  ],

  env: { es2022: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },

  plugins: ['import', 'unused-imports', 'simple-import-sort'],
  extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],

  rules: {
    // Import order + clean imports
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    // reduce noise in TS projects
    'import/no-unresolved': 'off',
  },

  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
      rules: {
        // handled by unused-imports
        '@typescript-eslint/no-unused-vars': 'off',

        // useful TS rules for interview-quality code
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
        ],
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
  ],
};
