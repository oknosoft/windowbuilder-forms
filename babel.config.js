
let defaultPresets;

// We release a ES version of Material-UI.
// It's something that matches the latest official supported features of JavaScript.
// Nothing more (stage-1, etc), nothing less (require, etc).
if (process.env.BABEL_ENV === 'es') {
  defaultPresets = [];
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: ['modules', 'production-umd'].includes(process.env.BABEL_ENV) ? false : 'commonjs',
      },
    ],
  ];
}

module.exports = {
  presets: defaultPresets.concat(['@babel/preset-react']),
  generatorOpts: {
    jsescOption: {
      minimal: true
    }
  },
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
  ],
  env: {
    es: {
      plugins: [
        // ['react-remove-properties', { properties: ['data-mui-test'] }],
        // ['transform-react-remove-prop-types',{mode: 'wrap'}],
        // [
        //   'babel-plugin-import',
        //   {
        //     'libraryName': '@material-ui/core',
        //     'libraryDirectory': 'esm',
        //     'camel2DashComponentName': false
        //   },
        //   'core'
        // ],
        // [
        //   'babel-plugin-import',
        //   {
        //     'libraryName': '@material-ui/icons',
        //     'libraryDirectory': 'esm',
        //     'camel2DashComponentName': false
        //   },
        //   'icons'
        // ],
      ],
      // It's most likely a babel bug.
      // We are using this ignore option in the CLI command but that has no effect.
      ignore: ['**/*.test.js'],
    },
    production: {
      plugins: [
        'transform-react-constant-elements',
        ['react-remove-properties', {properties: ['data-mui-test']}],
        ['transform-react-remove-prop-types', {mode: 'wrap'}],
        ['babel-plugin-import',
          {
            'libraryName': '@material-ui/core',
            'libraryDirectory': 'esm',
            'camel2DashComponentName': false
          },
          'core'
        ],
        ['babel-plugin-import',
          {
            'libraryName': '@material-ui/icons',
            'libraryDirectory': 'esm',
            'camel2DashComponentName': false
          },
          'icons'
        ],
      ],
      // It's most likely a babel bug.
      // We are using this ignore option in the CLI command but that has no effect.
      ignore: ['**/*.test.js'],
    },
  },
};
