import globals from 'globals';
import pluginJs from '@eslint/js';


/** @type {import('eslint').Linter.Config[]} */
export default [
    {languageOptions: { globals: globals.node }},
    pluginJs.configs.recommended,
    {
        rules: {
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            indent: ['error', 4],
        }
    }
  
];

