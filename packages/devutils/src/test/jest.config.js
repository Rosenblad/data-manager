const path = require('path');

module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./packages/devutils/src/test/setupTests.ts'],
  roots: ['./packages/api-browser/src'],
  rootDir: path.resolve(process.cwd()),
  moduleNameMapper: {
    '@data-manager/devutils': path.resolve(__dirname, '../index.ts'),
  }
};
