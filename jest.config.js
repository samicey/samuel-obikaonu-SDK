module.exports = {
    roots: ['<rootDir>/src'],
    preset: 'ts-jest',
    testTimeout: 30000,
    testEnvironment: 'node',
    testPathIgnorePatterns: ['node_modules', '/assets', '/build'],
    testMatch: ['**/tests/**/*.+(ts|tsx|js)'],
  };