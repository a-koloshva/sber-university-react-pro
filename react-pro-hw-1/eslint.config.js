import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import boundaries from 'eslint-plugin-boundaries';
import tsParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
    { ignores: ['dist/**'] },
    js.configs.recommended,
    prettier,

    {
        files: ['**/*.{ts,tsx}'],

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.app.json', './tsconfig.node.json'],
            },
        },

        plugins: {
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
            import: importPlugin,
            boundaries,
            '@typescript-eslint': tseslint.plugin,
        },

        settings: {
            'import/resolver': {
                typescript: {
                    project: ['./tsconfig.app.json', './tsconfig.node.json'],
                },
            },
            react: {
                version: 'detect',
            },

            'boundaries/elements': [
                { type: 'shared', pattern: 'src/shared/*' },
                { type: 'entities', pattern: 'src/entities/*' },
                { type: 'features', pattern: 'src/features/*' },
                { type: 'widgets', pattern: 'src/widgets/*' },
                { type: 'pages', pattern: 'src/pages/*' },
                { type: 'app', pattern: 'src/app/*' },
            ],
        },

        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            ...importPlugin.configs.recommended.rules,
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            'react/react-in-jsx-scope': 'off',

            'boundaries/element-types': [
                'error',
                {
                    default: 'disallow',
                    rules: [
                        { from: 'features', allow: ['shared', 'entities'] },
                        { from: 'entities', allow: ['shared'] },
                        { from: 'widgets', allow: ['shared', 'features', 'entities'] },
                        { from: 'pages', allow: ['widgets', 'features', 'entities', 'shared'] },
                    ],
                },
            ],
        },
    },
];
