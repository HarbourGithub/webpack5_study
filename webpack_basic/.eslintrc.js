module.exports = {
    extends: [
        'eslint:recommended'
    ],
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        "no-var": "error"
    }
}