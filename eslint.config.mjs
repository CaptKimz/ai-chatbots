import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            import: importPlugin,
            '@typescript-eslint': tseslint.plugin,
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            'eqeqeq': 'error',
            'no-unused-vars': 'off',
            'quotes': ['error', 'single'],
            'max-len': ['warn', { code: 100 }],
            'complexity': ['warn', 10],
            'max-depth': ['warn', 4],
            'no-var': 'error',
            'prefer-const': 'error',
            'no-multiple-empty-lines': ['error', { max: 1 }],
        },
    }
)
