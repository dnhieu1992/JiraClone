/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../../.eslintrc.cjs', 'next/core-web-vitals'],

  // Next có cả runtime browser + server
  env: { browser: true, node: true },

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
  },
};
