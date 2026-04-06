import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroPlugin from 'eslint-plugin-astro';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      }],
    },
  },
  {
    files: ['tests/**/*.{ts,tsx}'],
    rules: {
      // Tests frequently destructure to remove keys — allow unused destructured vars
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
    },
  },
  {
    ignores: [
      'dist/',
      'node_modules/',
      '.astro/',
      '.vercel/',
      '.lighthouseci/',
      '.agents/',
      '.claude/',
      '.cursor/',
      '.gemini/',
      '_bmad/',
      '_bmad-output/',
      'scripts/',
      'test-results/',
      'playwright-report/',
      '*.cjs',
    ],
  },
);
