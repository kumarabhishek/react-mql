const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: 'react-mql.js',
		library: 'ReactMql',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	externals : {
		react: 'react',
		'react-dom': 'react-dom'
	},
	target: 'web',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
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
