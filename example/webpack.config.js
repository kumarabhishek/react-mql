const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname, './'),
	entry: './index.jsx',
	output: {
		path: path.resolve(__dirname, '../docs'),
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
							"@babel/preset-react", "@babel/preset-env"
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
