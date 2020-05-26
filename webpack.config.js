const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// See: https://github.com/jantimon/html-webpack-plugin/issues/1094
const htmlMinifyOptions = {
	collapseWhitespace: true,
	removeComments: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	useShortDoctype: true
};

module.exports = [
	{
		devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
		entry: [
			'./src/index.js',
		],
		target: 'web',
		mode: process.env.NODE_ENV,
		optimization: {
			minimize: process.env.NODE_ENV === 'production',
			minimizer: [
				new TerserJSPlugin({}),
				new OptimizeCSSAssetsPlugin({}),
			],
		},
		output: {
			path: path.resolve(__dirname, './build'),
			filename: 'js/app.js',
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: [
						path.resolve('core-js'),
					],
					use: {
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [
								[
									'@babel/preset-env',
									{
										targets: {
											ie: 11,
											esmodules: false,
										},
									},
								],
								'@babel/preset-react',
							],
						},
					},
				},
				{
					test: /\.handlebars$/,
					loader: 'handlebars-loader'
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: process.env.NODE_ENV === 'development',
							},
						},
						'css-loader', // translates CSS into CommonJS modules
						{
							loader: 'postcss-loader', // Run post css actions
							options: {
								plugins: function () { // post css plugins, can be exported to postcss.config.js
									return [
										require('precss'),
										require('autoprefixer')
									];
								}
							}
						},
						'sass-loader', // compiles Sass to CSS
					]
				},
				{
					test: /\.(png|jpg)$/,
					loader: 'url-loader',
				}
			],
		},
		plugins: [
			new webpack.ProgressPlugin(),
			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
				chunkFilename: 'css/[id].css',
			}),
			new HtmlWebpackPlugin({
				template: './src/index.ejs',
				filename: './index.html',
				minify: process.env.NODE_ENV === 'production' ? htmlMinifyOptions : false,
			}),
		],
	},
];
