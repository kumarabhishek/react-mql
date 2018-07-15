const path = require('path');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production';
const HtmlWebPackPlugin = require("html-webpack-plugin");

const libConfig = {
	context: path.resolve(__dirname, './src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
		filename: 'react-mql.js',
		library: 'ReactMql',
		libraryTarget: 'umd'
	},
	target: 'web',
  module: {
    rules: [
      {
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						babelrc: false,
						"presets": [
							"react", "env"
						],
						"plugins": [
							"transform-react-jsx",
							"transform-object-rest-spread"
						]
					}					
				}
			}
    ],
  },
	devtool: devMode ? 'none' : 'sourcemap',
	optimization: {
		minimize: devMode ? false : true
  }
};


const exampleConfig = {
	context: path.resolve(__dirname, './example'),
  entry: './index.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},
  module: {
    rules: [
      {
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						babelrc: false,
						"presets": [
							"react", "env"
						],
						"plugins": [
							"transform-react-jsx",
							"transform-object-rest-spread",
							"syntax-dynamic-import",
						]
					}					
				}
			}
    ],
  },
  plugins: [
		new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
		})
  ],
	devtool: devMode ? 'none' : 'sourcemap',
	optimization: {
		minimize: devMode ? false : true
  }
};


module.exports = [libConfig, exampleConfig];
