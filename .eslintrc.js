module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            },

        },
        //取消对ts以及vue文件的no-undef的检查（TS本身会做这部分检查），请在基于TypeScript的Vue项目中使用
        {
            files: ["*.ts", "*.tsx", "*.vue"],
            rules: {
                "no-undef": "off",
            }
        }
    ]
}
