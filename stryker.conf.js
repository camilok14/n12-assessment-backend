/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress', 'dashboard'],
  testRunner: 'jest',
  coverageAnalysis: 'off',
  mutate: ['src/**/*.ts', '!src/main.ts', '!src/**/*spec.ts', '!src/**/*module.ts', '!src/**/*dto.ts', '!src/**/*schema.ts']
};
