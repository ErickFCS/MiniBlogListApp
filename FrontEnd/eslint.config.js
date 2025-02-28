import globals from 'globals'
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import stylisticJs from '@stylistic/eslint-plugin-js'

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
            '@stylistic/js': stylisticJs,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            'react/prop-types': 'off',
            '@stylistic/js/indent': ['error', 4,],
            '@stylistic/js/semi': ['error', 'never',],
            '@stylistic/js/comma-dangle': ['error', 'always',],
            '@stylistic/js/comma-spacing': ['error', { 'after': true, },],
            '@stylistic/js/jsx-quotes': ['error', 'prefer-single',],
            '@stylistic/js/quotes': ['error', 'single', {
                'allowTemplateLiterals': 'always',
            },],
            'eqeqeq': ['error', 'always',],
            '@stylistic/js/object-curly-spacing': ['error', 'always',],
            '@stylistic/js/arrow-spacing': ['error', { 'before': true, 'after': true, },],
        },
    },
]
