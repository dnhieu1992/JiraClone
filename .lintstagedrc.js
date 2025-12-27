module.exports = {
  // TypeScript/JavaScript files - chạy eslint và prettier
  '**/*.{ts,tsx,js,jsx}': [
    'eslint --fix',
    'prettier --write',
  ],

  // JSON, CSS, SCSS, Markdown files - chỉ format
  '**/*.{json,css,scss,md}': ['prettier --write'],

  // Config files
  '**/package.json': ['prettier --write'],
  '**/tsconfig*.json': ['prettier --write'],
  '**/.eslintrc.*': ['prettier --write'],
  '**/.prettierrc*': ['prettier --write'],
};

