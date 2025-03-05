import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
    { ignores: ['dist', '**/*.test.jsx', 'node_modules', '.vite', 'FrontEnd', 'ReactQuery_FrontEnd', 'Redux_FrontEnd'] },
    {
        files: ['**/*.{js}'],
        languageOptions: { globals: globals.node },
        settings: { react: { version: '18.3' } },
        plugins: {
            '@stylistic/js': stylisticJs
        },
        rules: {
            ...js.configs.recommended.rules,
            '@stylistic/js/indent': ['error', 4],
            '@stylistic/js/semi': ['error', 'never'],
            '@stylistic/js/comma-dangle': ['error', 'never'],
            '@stylistic/js/comma-spacing': ['error', { 'after': true }],
            '@stylistic/js/quotes': ['error', 'single', {
                'allowTemplateLiterals': 'always'
            }],
            'eqeqeq': ['error', 'always'],
            '@stylistic/js/object-curly-spacing': ['error', 'always'],
            '@stylistic/js/arrow-spacing': ['error', { 'before': true, 'after': true }],
            'no-unused-vars': 'off'
        }
    }
]