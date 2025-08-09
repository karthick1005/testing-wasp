const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  target: 'web',
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
        './Standalone': './src/standalone.js'
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