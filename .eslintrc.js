module.exports = {
    root: true,
    env: {
        node: true,
        jest: true
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        requireConfigFile: false
    },
    plugins: [
        'import',
        '@typescript-eslint',
        'disable-autofix'
    ],
    extends: [
        'plugin:vue/essential'
    ],
    rules: {
        'no-promise-executor-return': 2,
        'no-unreachable-loop': 2,
        'no-await-in-loop': 1,
        'no-undef': 2,

        /* Best Practices */
        'grouped-accessor-pairs': [2, 'getBeforeSet'],
        'max-classes-per-file': 2,
        'no-alert': 2,
        'no-caller': 2,
        'no-case-declarations': 2,
        'no-eval': 2,
        'no-extra-bind': 2,
        'no-floating-decimal': 2,
        'no-implicit-globals': 2,
        'no-implied-eval': 2,
        'no-invalid-this': 0,
        '@typescript-eslint/no-invalid-this': 2,
        'no-labels': 2,
        'no-lone-blocks': 2,
        'no-new': 2,
        'no-new-func': 2,
        'no-new-wrappers': 2,
        'no-octal-escape': 2,
        'no-param-reassign': [2, {
            props: false
        }],
        'no-proto': 2,
        'no-return-assign': 1,
        'no-script-url': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-throw-literal': 2,
        'no-unused-expressions': 1,
        'no-useless-call': 2,
        'no-useless-concat': 1,
        'no-void': 2,
        'require-await': 2,
        'yoda': 2,

        /* Strict Mode */
        'strict': 2,

        /* Variables */
        'no-label-var': 2,
        'no-shadow': 0,
        '@typescript-eslint/no-shadow': 2,
        'no-undef-init': 2,

        'vue/no-v-model-argument': 0,
        'import/extensions': [
            'warn',
            'never',
            {
                'js': 'as-needed',
                'json': 'as-needed',
                'vue': 'always',
                'svg': 'always'
            }
        ],
        'vue/no-mutating-props': 'error',
        'vue/no-arrow-functions-in-watch': 'error',
        'vue/multi-word-component-names': [2, {
            'ignores': [
                'Centered'
            ]
        }],
        'vue/no-reserved-component-names': 'off',
        'eol-last': [2, 'always'],
        'no-multiple-empty-lines': [
            'error',
            {
                max: 2
            }
        ],
        'block-spacing': 2,
        'max-len': [2, {
            code: 140,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
            ignorePattern: '\\s*[path,background-image]\\s*'
        }],
        'vue/max-len': [2, {
            code: 140,
            ignoreComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
            ignoreHTMLAttributeValues: true,
            ignoreHTMLTextContents: true
        }],
        'no-trailing-spaces': [2, {
            ignoreComments: true
        }],
        'vue/no-parsing-error': [2, {
            'x-invalid-end-tag': false
        }],
        quotes: [2, 'single', {
            allowTemplateLiterals: true
        }],
        indent: [2, 4, {
            SwitchCase: 1
        }],
        'vue/script-indent': [2, 4, {
            baseIndent: 1,
            switchCase: 1,
            ignores: [
                'ConditionalExpression',
                'LogicalExpression',
                'TemplateLiteral > *'
            ]
        }],
        'vue/html-indent': [2, 4, {
            attribute: 1,
            closeBracket: 0
        }],
        'no-tabs': 2,
        semi: [2, 'never'],
        'quote-props': [2, 'as-needed', {
            'unnecessary': false
        }],
        'comma-dangle': [2, 'never'],
        'object-curly-spacing': 0,
        '@typescript-eslint/object-curly-spacing': [2, 'always'],
        'array-bracket-spacing': [2, 'never'],
        'arrow-parens': [2, 'always'],
        'linebreak-style': 0,
        'no-var': 2,
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': [2, {
            args: 'after-used',
            argsIgnorePattern: '^_'
        }],
        'prefer-const': 2,
        'one-var': [2, {
            initialized: 'never',
            uninitialized: 'always'
        }],
        'object-shorthand': [2, 'always'],
        'array-callback-return': [2, { allowImplicit: true }],
        'prefer-destructuring': [2, {
            VariableDeclarator: {
                array: false,
                object: true
            }
        }],
        'prefer-rest-params': 2,
        eqeqeq: [2, 'always'],
        'vue/eqeqeq': [2, 'always'],
        'no-case-declarations': 2,
        'no-unneeded-ternary': 2,
        'no-else-return': [2, { allowElseIf: true }],
        'newline-per-chained-call': 2,
        'no-confusing-arrow': [2, { allowParens: true }],
        'no-dupe-class-members': 2,
        'no-duplicate-imports': 0,
        '@typescript-eslint/no-duplicate-imports': 2,
        'no-restricted-syntax': [2, 'ForInStatement'],
        'prefer-arrow-callback': [2, { allowNamedFunctions: true }],
        'space-before-function-paren': [2, {
            anonymous: 'never',
            named: 'never'
        }],
        'no-multi-spaces': 2,
        'no-multi-assign': 2,
        'accessor-pairs': 2,
        'vue/max-attributes-per-line': [2, {
            singleline: {
                max: 1
            },
            multiline: {
                max: 1
            }
        }],
        'vue/order-in-components': 2,
        'vue/attributes-order': [2, {
            order: [
                'DEFINITION',
                'LIST_RENDERING',
                'CONDITIONALS',
                'RENDER_MODIFIERS',
                'GLOBAL',
                'UNIQUE',
                'SLOT',
                'TWO_WAY_BINDING',
                'OTHER_ATTR',
                'EVENTS',
                'CONTENT'
            ]
        }],
        'vue/html-closing-bracket-newline': [2, {
            singleline: 'never',
            multiline: 'always'
        }],
        'vue/html-self-closing': ['error', {
            html: {
                void: 'never',
                normal: 'always',
                component: 'always'
            },
            svg: 'always',
            math: 'always'
        }],
        'vue/html-closing-bracket-spacing': [2, {
            startTag: 'never',
            endTag: 'never',
            selfClosingTag: 'always'
        }],
        'vue/first-attribute-linebreak': [2, {
            'singleline': 'ignore',
            'multiline': 'below'
        }],
        'key-spacing': [2, {
            beforeColon: false,
            afterColon: true,
            mode: 'strict'
        }],
        'vue/key-spacing': [2, {
            beforeColon: false,
            afterColon: true,
            mode: 'strict'
        }],
        'keyword-spacing': [2, {
            before: true,
            after: true
        }],
        'vue/keyword-spacing': [2, {
            before: true,
            after: true
        }],
        'vue/mustache-interpolation-spacing': [2, 'always'],
        'vue/no-multi-spaces': [2, {
            ignoreProperties: false
        }],
        'vue/v-bind-style': [2, 'shorthand'],
        'vue/v-on-style': [2, 'shorthand'],
        'vue/no-spaces-around-equal-signs-in-attribute': 2,
        'vue/no-template-shadow': 2,
        'vue/require-prop-types': 2,
        'vue/this-in-template': [2, 'never'],
        'vue/component-definition-name-casing': [2, 'PascalCase'],
        'curly': 'warn',
        'arrow-spacing': [2, { 'before': true, 'after': true }],
        'comma-spacing': [2, { 'before': false, 'after': true }],
        'vue/no-unsupported-features': ['error', {
            'version': '2.7.14',
            'ignores': []
        }],
        'vue/no-static-inline-styles': [2, {
            'allowBinding': false
        }],
        'vue/no-multiple-objects-in-class': 2,
        'vue/no-unused-properties': [2, {
            'groups': ['setup'],
            'deepData': false,
            'ignorePublicMembers': false
        }],
        'vue/no-undef-components': [2, {
            'ignorePatterns': [
                'ValidationProvider',
                'ValidationObserver',
                'v-popover',
                'router-view',
                'el(\\-\\w+)+',
                'textarea-autosize',
                'TableColumn',
                'Table',
                'Popover',
                'Tooltip',
                'DatePicker'
            ]
        }],
        'vue/attribute-hyphenation': 2,
        'vue/prop-name-casing': [1, 'camelCase'],
        'vue/v-on-event-hyphenation': [0, 'always', {
            'autofix': false,
            'ignore': []
        }],
        'vue/custom-event-name-casing': [1, 'camelCase'],
        'space-before-blocks': 0,
        '@typescript-eslint/space-before-blocks': 2,
        '@typescript-eslint/type-annotation-spacing': 2,
        'space-in-parens': [2, 'never'],
        'vue/space-in-parens': [2, 'never'],
        'space-infix-ops': 0,
        '@typescript-eslint/space-infix-ops': 2,
        'vue/space-infix-ops': 2,
        'space-unary-ops': 2,
        'vue/space-unary-ops': 2,
        'template-curly-spacing': [2, 'never'],
        'vue/template-curly-spacing': [2, 'never'],
        'vue/operator-linebreak': [
            2, 'after', {
                overrides: {
                    '?': 'before',
                    ':': 'before'
                }
            }
        ],
        'object-curly-newline': [2, {
            multiline: true,
            consistent: true
        }
        ],
        'vue/object-curly-newline': [2, {
            multiline: true,
            consistent: true
        }]
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
                'max-len': 'off'
            }
        },
        {
            files: ['*.ts', '*.vue'],
            rules: {
                'no-undef': 0
            }
        }
    ]
}
