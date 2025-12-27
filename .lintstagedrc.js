module.exports = {
  // TypeScript/JavaScript files - chỉ check lỗi, không auto-fix
  // Dùng script từ package.json giống hệt khi chạy thủ công
  '**/*.{ts,tsx,js,jsx}': (filenames) => {
    // Loại bỏ config files khỏi ESLint check
    const codeFiles = filenames.filter(
      (f) =>
        !f.includes('.eslintrc') &&
        !f.includes('.lintstagedrc') &&
        !f.includes('next.config') &&
        !f.includes('jest.config') &&
        !f.includes('tailwind.config'),
    );
    if (codeFiles.length === 0) return [];

    // Group files by app/package
    const apiFiles = codeFiles.filter((f) => f.includes('apps/api/'));
    const webFiles = codeFiles.filter((f) => f.includes('apps/web/'));
    const sharedFiles = codeFiles.filter((f) => f.includes('packages/shared/'));

    const commands = [];

    // API files - chạy lint script từ package.json (giống pnpm lint)
    if (apiFiles.length > 0) {
      // Chạy lint script - nó sẽ check tất cả files trong src/
      // Giống như khi bạn chạy: cd apps/api && pnpm lint
      commands.push('pnpm --filter @jira-clone/api lint');
    }

    // Web files - chạy lint script từ package.json
    if (webFiles.length > 0) {
      // Chạy lint script - nó sẽ check tất cả files trong src/
      // Giống như khi bạn chạy: cd apps/web && pnpm lint
      commands.push('pnpm --filter @jira-clone/web lint');
    }

    // Shared files - nếu có lint script
    if (sharedFiles.length > 0) {
      // Có thể thêm nếu shared package có lint script
    }

    return commands;
  },

  // Prettier check - dùng root prettier
  '**/*.{ts,tsx,js,jsx,json,css,scss,md}': (filenames) => {
    // Batch 20 files mỗi lần để tránh SIGKILL
    const batchSize = 20;
    const batches = [];
    for (let i = 0; i < filenames.length; i += batchSize) {
      const batch = filenames.slice(i, i + batchSize);
      batches.push(`prettier --check ${batch.map((f) => `"${f}"`).join(' ')}`);
    }
    return batches;
  },

  // Config files - check format từng file
  '**/package.json': (filenames) => {
    return filenames.map((f) => `prettier --check "${f}"`);
  },
  '**/tsconfig*.json': (filenames) => {
    return filenames.map((f) => `prettier --check "${f}"`);
  },
  '**/.eslintrc.*': (filenames) => {
    return filenames.map((f) => `prettier --check "${f}"`);
  },
  '**/.prettierrc*': (filenames) => {
    return filenames.map((f) => `prettier --check "${f}"`);
  },
};
