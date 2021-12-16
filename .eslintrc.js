module.exports = {
    env: {
      es6: true,
      browser: true,
      node: true,
    },
    extends: ['airbnb-typescript', 'plugin:prettier/recommended'],
    parserOptions: {
      project: './tsconfig.json',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        createClass: 'createReactClass', // Regex for Component Factory to use,
        // default to "createReactClass"
        pragma: 'React', // Pragma to use, default to "React"
        version: 'detect', // React version. "detect" automatically picks the version you have installed.
        // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
        // default to latest and warns if missing
        // It will default to "detect" in the future
      },
      propWrapperFunctions: [
        // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
        'forbidExtraProps',
      ],
    },
    plugins: ['react'],
    rules: {
      'max-len': 'warn',
      'react/prop-types': 'off',
      'no-confusing-arrow': 'off',
      'import/prefer-default-export': 'off',
      'react/jsx-props-no-spreading': 'off',
    },
  };