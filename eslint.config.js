import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
    { ignores: ['dist', '**/*.test.jsx', 'node_modules', '.vite',], },
    {
        files: ['**/*.{js,jsx}',],
        languageOptions: { globals: globals.node },
        settings: { react: { version: '18.3', }, },
        plugins: {
            react,
            'react-hooks': reactHooks,
            '@stylistic/js': stylisticJs,
        },
        rules: {
            ...js.configs.recommended.rules,
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
            'no-unused-vars': 'off',
        },
    },
];