module.exports = {
    preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
    roots: [
        "./src/"
    ],
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)"
    ]
};
