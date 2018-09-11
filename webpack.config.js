const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: 'react-mql.js',
		library: 'ReactMql',
		libraryTarget: 'umd'
	},
	externals : {
		'react': 'react',
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
							"@babel/preset-react", "@babel/preset-env"
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
