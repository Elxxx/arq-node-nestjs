import type { Config } from 'jest';
const config: Config = {
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: { '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: 'tsconfig.json' }] },
  testMatch: ['**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!src/**/index.ts'],
  coverageDirectory: 'coverage/unit',
};
export default config;
