import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TOKEN_USAGE_PATTERN = /var\(--([a-z0-9-]+)\)/g;
const TOKEN_DECLARATION_PATTERN = /--([a-z0-9-]+)\s*:\s*([^;]+);/g;
const SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.css', '.scss']);

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(scriptDir, '..');
const srcRoot = path.join(webRoot, 'src');
const colorsFilePath = path.join(srcRoot, 'styles', 'colors.css');
const outputPath = path.join(srcRoot, 'styles', 'token-usage-report.md');

function extractCssBlock(content, selector) {
  const selectorIndex = content.indexOf(selector);
  if (selectorIndex === -1) {
    return '';
  }

  const blockStart = content.indexOf('{', selectorIndex);
  if (blockStart === -1) {
    return '';
  }

  let depth = 0;
  for (let i = blockStart; i < content.length; i += 1) {
    const char = content[i];
    if (char === '{') {
      depth += 1;
      continue;
    }
    if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return content.slice(blockStart + 1, i);
      }
    }
  }

  return '';
}

function parseTokenMap(cssBlock) {
  const tokens = new Map();
  let match = TOKEN_DECLARATION_PATTERN.exec(cssBlock);
  while (match) {
    const token = `--${match[1]}`;
    const value = match[2].trim();
    tokens.set(token, value);
    match = TOKEN_DECLARATION_PATTERN.exec(cssBlock);
  }
  TOKEN_DECLARATION_PATTERN.lastIndex = 0;
  return tokens;
}

async function collectSourceFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const nestedFiles = await collectSourceFiles(fullPath);
      files.push(...nestedFiles);
      continue;
    }

    const extension = path.extname(entry.name);
    if (!SCAN_EXTENSIONS.has(extension)) {
      continue;
    }

    if (fullPath === colorsFilePath) {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function getTokenUsages(content, relativePath) {
  const usageMap = new Map();
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    let match = TOKEN_USAGE_PATTERN.exec(line);
    while (match) {
      const token = `--${match[1]}`;
      const location = `${relativePath}:${index + 1}`;
      const tokenLocations = usageMap.get(token) ?? [];
      tokenLocations.push(location);
      usageMap.set(token, tokenLocations);
      match = TOKEN_USAGE_PATTERN.exec(line);
    }
    TOKEN_USAGE_PATTERN.lastIndex = 0;
  });

  return usageMap;
}

function sortByName(values) {
  return [...values].sort((a, b) => a.localeCompare(b));
}

function mergeUsageMaps(target, source) {
  for (const [token, locations] of source.entries()) {
    const existing = target.get(token) ?? [];
    target.set(token, existing.concat(locations));
  }
}

function formatValue(value) {
  return value ? `\`${value}\`` : '_not defined_';
}

async function main() {
  const colorsContent = await fs.readFile(colorsFilePath, 'utf8');

  const lightBlock = extractCssBlock(colorsContent, ':root');
  const darkBlock = extractCssBlock(colorsContent, "html[data-theme='dark']");

  const lightTokens = parseTokenMap(lightBlock);
  const darkTokens = parseTokenMap(darkBlock);
  const definedTokens = new Set([...lightTokens.keys(), ...darkTokens.keys()]);

  const files = await collectSourceFiles(srcRoot);
  const usageByToken = new Map();

  for (const filePath of files) {
    const relativePath = path.relative(webRoot, filePath).split(path.sep).join('/');
    const content = await fs.readFile(filePath, 'utf8');
    const fileUsages = getTokenUsages(content, relativePath);
    mergeUsageMaps(usageByToken, fileUsages);
  }

  for (const [token, locations] of usageByToken.entries()) {
    const uniqueLocations = [...new Set(locations)].sort((a, b) => a.localeCompare(b));
    usageByToken.set(token, uniqueLocations);
  }

  const usedTokens = new Set(usageByToken.keys());
  const referencedButUndefined = sortByName(
    [...usedTokens].filter((token) => !definedTokens.has(token)),
  );
  const definedButUnused = sortByName(
    [...definedTokens].filter((token) => !usedTokens.has(token)),
  );
  const allRelevantTokens = sortByName(new Set([...definedTokens, ...usedTokens]));

  const now = new Date().toISOString();
  const lines = [];

  lines.push('# Token Usage Report');
  lines.push('');
  lines.push(`- Generated at: \`${now}\``);
  lines.push('- Source of truth: `src/styles/colors.css`');
  lines.push(
    '- Scan scope: `src/**/*.{ts,tsx,css,scss}` (excluding `src/styles/colors.css`)',
  );
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push('| Metric | Count |');
  lines.push('| --- | ---: |');
  lines.push(`| Defined tokens (light + dark union) | ${definedTokens.size} |`);
  lines.push(`| Used tokens | ${usedTokens.size} |`);
  lines.push(`| Referenced but undefined | ${referencedButUndefined.length} |`);
  lines.push(`| Defined but unused | ${definedButUnused.length} |`);
  lines.push('');
  lines.push('## Token Details');
  lines.push('');

  for (const token of allRelevantTokens) {
    const lightValue = lightTokens.get(token);
    const darkValue = darkTokens.get(token);
    const usages = usageByToken.get(token) ?? [];

    lines.push(`### \`${token}\``);
    lines.push('');
    lines.push(`- Light value: ${formatValue(lightValue)}`);
    lines.push(`- Dark value: ${formatValue(darkValue)}`);
    lines.push(`- Usage count: ${usages.length}`);

    if (usages.length > 0) {
      lines.push('- Usage locations:');
      for (const location of usages) {
        lines.push(`  - \`${location}\``);
      }
    } else {
      lines.push('- Usage locations: _none_');
    }

    lines.push('');
  }

  lines.push('## Referenced But Undefined');
  lines.push('');
  if (referencedButUndefined.length === 0) {
    lines.push('None.');
  } else {
    for (const token of referencedButUndefined) {
      lines.push(`- \`${token}\``);
    }
  }
  lines.push('');
  lines.push('## Defined But Unused');
  lines.push('');
  if (definedButUnused.length === 0) {
    lines.push('None.');
  } else {
    for (const token of definedButUnused) {
      lines.push(`- \`${token}\``);
    }
  }
  lines.push('');

  await fs.writeFile(outputPath, `${lines.join('\n')}`, 'utf8');
  // eslint-disable-next-line no-console
  console.log(`Token usage report written to ${path.relative(webRoot, outputPath)}`);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
