import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import path from "path";

export default defineConfig([
  {
    ignores: [
      "dist/**",
      "coverage/**",
      ".husky/**",
      "*.yml",
      "Dockerfile",
      "jest.config.ts",
      "jest-e2e.config.ts",
      "*.mts",
      "*.md",
      "*.json"
    ],
  },
  {
    files: ["**/*.{ts,tsx,js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: path.resolve(__dirname, "./tsconfig.json"),
        tsconfigRootDir: __dirname,
      },
    },
  },
  ...tseslint.configs.recommended,
]);
