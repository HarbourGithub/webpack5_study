module.exports = {
    // 继承eslint推荐的规则
    extends: ['eslint:recommended'],
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        // 禁止使用var
        "no-var": "error",
        // 禁止使用分号
        "semi": ["error", "never"],
        // 运算符必须有空格
        "space-infix-ops": "error",
    }
}