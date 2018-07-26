const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname, './'),
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
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		port: 3000
	}
};
