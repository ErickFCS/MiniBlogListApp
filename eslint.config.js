import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
    { ignores: ['dist', '**/*.test.jsx', 'node_modules', '.vite', 'FrontEnd', 'ReactQuery_FrontEnd', 'Redux_FrontEnd'] },
    {
        files: ['**/*.{js}'],
        languageOptions: { globals: globals.node },
        settings: { react: { version: '18.3' } },
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            ...js.configs.recommended.rules,
            '@stylistic/indent': ['error', 4],
            '@stylistic/semi': ['error', 'never'],
            '@stylistic/comma-dangle': ['error', 'never'],
            '@stylistic/comma-spacing': ['error', { 'after': true }],
            '@stylistic/quotes': ['error', 'single', {
                'allowTemplateLiterals': 'always'
            }],
            'eqeqeq': ['error', 'always'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
            'no-unused-vars': 'off'
        }
    }
]
