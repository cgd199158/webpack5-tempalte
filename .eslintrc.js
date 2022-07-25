import path from 'path';
import fs from 'fs';

function parseAutoImportsDts(contents) {
  const matchResults = contents.matchAll(/^\s+const (\w+): typeof import/gm);
  return Array.from(matchResults, ([, word]) => word);
}

function uiPackageAutoImportGlobals() {
  const SRC = path.resolve(__dirname, './src/type/auto-imports.d.ts');

  const contents = fs.readFileSync(SRC, { encoding: 'utf-8' });
  const parsed = parseAutoImportsDts(contents);
  return parsed.reduce((acc, word) => {
    acc[word] = 'readonly';
    return acc;
  }, {});
}

module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    commonjs: true,
  },
  globals: {
    _: true,
    ...uiPackageAutoImportGlobals(),
  },
  extends: ['alloy', 'alloy/typescript', 'alloy/vue'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
  },
};
