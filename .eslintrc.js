module.exports = {
    "plugins": ["prettier"],

    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": ["standard", "prettier"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        'prettier/prettier': [
        'error',
        {
            printWidth: 80,
            tabWidth: 2,
            useTabs: false,
            semi: true,
            singleQuote: true,
            trailingComma: 'all',
            bracketSpacing: true,
            jsxBracketSameLine: false,
        },
        ],
    }
};