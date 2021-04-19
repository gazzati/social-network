module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'airbnb',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint',
        'prettier'
    ],
    'rules': {
        'semi': ['error', 'never'],
        'quotes': ['error', 'single'],
        'max-len': ['error', {'code': 150}],
        'arrow-body-style': 'off',
        'react/prop-types': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-filename-extension': [
            'error',
            {
                'extensions': ['.tsx', '.ts', '.jsx']
            }
        ],
        'react/button-has-type': 'off',
        '@typescript-eslint/no-unused-vars': [2, {'args': 'none'}],
        '@typescript-eslint/explicit-function-return-type': 'off',
        'no-use-before-define': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/no-autofocus': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'import/extensions': 'off',
        'import/no-cycle': 'off',
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-expressions': [
            'error',
            {
                'allowShortCircuit': true,
                'allowTernary': true
            }
        ],
        'no-plusplus': 'off',
        'no-shadow': 'off',
        'no-nested-ternary': 'off',
        'camelcase': 'off'
    }
}
