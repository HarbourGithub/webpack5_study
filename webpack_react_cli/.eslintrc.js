module.exports = {
    // 继承react推荐的规则
    extends: [
        'plugin:react/recommended', 
        'plugin:react-hooks/recommended'
    ],
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