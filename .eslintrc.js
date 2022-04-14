module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/typescript/recommended"
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "indent": [
            "error",
            4,
            {
                SwitchCase: 1
            }
        ],
        "quotes": ["error", "double"],
        "comma-dangle": ["error", "never"],
        "semi": [
            "error",
            "always",
            {
                omitLastInOneLineBlock: true
            }
        ]
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
                "**/*.test.{j,t}s?(x)"
            ],
            env: {
                jest: true
            }
        }
    ]
};
