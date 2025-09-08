import type { Config } from 'jest';
const config: Config = {
  roots: ['<rootDir>/test/e2e'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: { '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: 'tsconfig.json' }] },
  testMatch: ['**/*.e2e-spec.ts'],
  globalSetup: '<rootDir>/test/e2e/global-setup.ts',
  collectCoverage: false,
};
export default config;
