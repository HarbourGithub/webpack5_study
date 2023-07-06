module.exports = {
    extends: [
        'eslint:recommended'
    ],
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    rules: {
        "no-var": "error"
    }
}