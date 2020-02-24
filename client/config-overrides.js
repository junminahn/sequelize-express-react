const { override, addBabelPresets, addBabelPlugins } = require('customize-cra');

module.exports = override(
  // ...addBabelPresets([
  //   {
  //     env: {
  //       production: {
  //         plugins: ['styled-jsx/babel'],
  //       },
  //       development: {
  //         plugins: ['styled-jsx/babel'],
  //       },
  //       test: {
  //         plugins: ['styled-jsx/babel-test'],
  //       },
  //     },
  //   },
  // ]),
  ...addBabelPlugins('styled-jsx/babel')
);
