module.exports = {
    "env": {
        "browser": true,
        "es2022": true,
        "node": true,
        "commonjs": true
    },
    "extends": [
        // "airbnb": 这是由 Airbnb 团队维护的一组 JavaScript 代码规范，
        // 它提供了一套严格的、可读性高的代码规则，用于保持代码质量和一致性
        "airbnb",
        // 这个规则集合由 eslint-plugin-import 提供，它包含一些用于检查和约束 ES6 模块导入和导出的规则
        "plugin:import/recommended",
        // 这个规则集合扩展了 "plugin:import/recommended"，添加了一些用于 TypeScript 中的导入和导出的规则
        "plugin:import/typescript",
        // 这个规则集合由 eslint-plugin-promise 提供，它提供了一些规则用于检查和约束 Promise 的使用
        "plugin:promise/recommended",
        //  这个规则集合由 eslint-plugin-react 提供，它包含一些用于检查和约束 React 代码的规则
        "plugin:react/recommended",
        // 这个规则集合由 eslint-plugin-react-hooks 提供，它包含一些用于检查和约束 React Hooks 的规则
        "plugin:react-hooks/recommended",
        // 这个规则集合由 eslint-plugin-jsx-a11y 提供，它包含一些用于检查和约束 JSX 元素上可访问性的规则
        "plugin:jsx-a11y/recommended",
        // 这个规则集合由 @typescript-eslint/eslint-plugin 提供，它包含一些用于检查和约束 TypeScript 代码的规则
        "plugin:@typescript-eslint/recommended",
        // 这个规则集合扩展了 "plugin:@typescript-eslint/recommended"，添加了一些需要类型检查的 TypeScript 规则
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
        "project": "./tsconfig.json"
    },
    "plugins": [
        "import",
        "promise",
        "react",
        "react-hooks",
        "jsx-a11y",
        "prettier",
        "@typescript-eslint"
    ],
    "globals": {},
    "overrides": [],
    "rules": {}
}
