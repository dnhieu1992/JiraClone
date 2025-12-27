/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../../.eslintrc.cjs'],
  env: { node: true },

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
  },

  rules: {
    'no-console': 'warn',
  },
};

