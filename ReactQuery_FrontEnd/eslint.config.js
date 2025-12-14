import globals from 'globals'
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import stylistic from '@stylistic/eslint-plugin'

export default [
    reactRefresh.configs.recommended,
    reactRefresh.configs.vite,
    { ignores: ['dist', '**/*.test.jsx', 'node_modules', '.vite',], },
    {
        files: ['**/*.{js,jsx}',],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true, },
                sourceType: 'module',
            },
        },
        settings: { react: { version: '18.3', }, },
        plugins: {
            react,
            'react-hooks': reactHooks,
            '@stylistic': stylistic,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            'no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_', 'caughtErrorsIgnorePattern': '^_', },],
            'react/prop-types': 'off',
            '@stylistic/indent': ['error', 4,],
            '@stylistic/semi': ['error', 'never',],
            '@stylistic/comma-dangle': ['error', 'always',],
            '@stylistic/comma-spacing': ['error', { 'after': true, },],
            '@stylistic/jsx-quotes': ['error', 'prefer-single',],
            '@stylistic/quotes': ['error', 'single', {
                'allowTemplateLiterals': 'always',
            },],
            'eqeqeq': ['error', 'always',],
            '@stylistic/object-curly-spacing': ['error', 'always',],
            '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true, },],
        },
    },
]
