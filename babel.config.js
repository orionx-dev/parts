module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'babel-plugin-transform-class-properties',
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
    // ['@babel/plugin-proposal-class-properties', {loose: true}],
    // ['@babel/plugin-proposal-private-methods', {loose: true}],
    // ['@babel/plugin-proposal-private-property-in-object', {loose: true}],
  ],
  // assumptions: {
  //   setPublicClassFields: true,
  //   privateFieldsAsSymbols: true
  // }
  // plugins: [
  //   [
  //     "module-resolver", {
  //         "root": ["."],
  //         "extension": [
  //         '.js',
  //         '.ts',
  //         '.jsx',
  //         '.tsx',
  //       ],
  //         "alias": {
  //           "App": "./src/App",
  //           "react-apollo-decorators/lib": "./src/App/helpers/graphql-decorators"
  //       }
  //     }
  //   ]
  // ]
  // Latest stable ECMAScript features
  //   [
  //     require.resolve('babel-preset-env'),
  //     {
  //       targets: {
  //         // React parses on ie 9, so we should too
  //         ie: 9,
  //         // We currently minify with uglify
  //         // Remove after https://github.com/mishoo/UglifyJS2/issues/448
  //         uglify: true,
  //       },
  //       // Disable polyfill transforms
  //       useBuiltIns: false,
  //       // Do not transform modules to CJS
  //       modules: false,
  //     },
  //   ],
  //   [
  //    require.resolve("babel-plugin-module-resolver"),
  //     {
  //       "root": ["./"],
  //       "alias": {
  //         "App": "./src/App",
  //         "react-apollo-decorators/lib": "./src/App/helpers/graphql-decorators"
  //       }
  //     }
  //   ],
  //   // JSX, Flow
  //   [require.resolve('@babel/preset-react')],
  // ],
  // plugins: [
  //   // require.resolve('babel-plugin-transform-decorators-legacy'),
  //   // function* () { yield 42; yield 43; }
  //   [
  //     require.resolve('babel-plugin-transform-regenerator'),
  //     {
  //       // Async functions are converted to generators by babel-preset-env
  //       async: false,
  //     },
  //   ],
  //   // Adds syntax support for import()
  //   // require.resolve('babel-plugin-syntax-dynamic-import'),
  // ],
};
