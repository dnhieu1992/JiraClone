const config = {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['.next/**', 'node_modules/**'],
  rules: {
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__(?:[a-z0-9]+(?:-[a-z0-9]+)*)|--(?:[a-z0-9]+(?:-[a-z0-9]+)*))?$',
      {
        message:
          'Use kebab-case with optional BEM suffixes: block, block__element, block--modifier.',
      },
    ],
    'max-nesting-depth': 2,
    'no-descending-specificity': null,
  },
};

export default config;
