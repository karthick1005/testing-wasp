const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    target: 'web',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      publicPath: 'auto',
      clean: true
    },
    devServer: {
      port: 3002,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      },
      hot: true,
      client: {
        overlay: false // Disable client-side overlay to prevent conflicts
      }
    },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                browsers: ['last 2 versions', 'ie >= 11']
              },
              modules: false // Let webpack handle modules
            }],
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'demoReactApp',
      filename: 'remoteEntry.js',
      exposes: {
        './DemoApp': './src/App.js',
        './EmbeddedDemoApp': './src/EmbeddedDemoApp.js',
        './DemoAppWithRouter': './src/AppWithRouter.js',
        './DemoAppWithBrowserRouter': './src/AppWithBrowserRouter.js',
        './DemoAppForHost': './src/AppForHost.js',
        './DemoAppForHostNoRouter': './src/AppForHostNoRouter.js',
        './DemoAppForHostWithRoutes': './src/AppForHostWithRoutes.js',
        './DemoAppForHostUrlSync': './src/AppForHostUrlSync.js',
        './Standalone': './src/standalone.js',
        './StandaloneWithRouter': './src/standaloneWithRouter.js'
      },
      shared: {
        react: {
          singleton: true, // Force single React instance
          strictVersion: false,
          requiredVersion: false,
          eager: false // Don't load eagerly, wait for host
        },
        'react-dom': {
          singleton: true, // Force single ReactDOM instance
          strictVersion: false,
          requiredVersion: false,
          eager: false // Don't load eagerly, wait for host
        },
        'react-router-dom': {
          singleton: true,
          strictVersion: false,
          requiredVersion: false,
          eager: false
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
  };
};