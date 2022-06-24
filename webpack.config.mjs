import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env) => {
	const config = {
		mode: env.prod ? 'production' : 'development',
		entry: {
			index: './src/index.tsx'
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Development',
				template: './src/index.html'
			})
		],
		output: {
			filename: '[name].bundle.js',
			path: resolve(__dirname, 'dist'),
			clean: true
		},
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource'
				},
				{
					test: /\.tsx?$/i,
					use: ['ts-loader']
				}
			]
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.jsx', '.js']
		}
	};

	if(env.prod) {
		config.optimization = {
			moduleIds: 'deterministic',
			runtimeChunk: 'single',
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all'
					}
				}
			}
		};
		config.output.filename = '[name].[contenthash].js';
	} else {
		config.devtool = 'inline-source-map';
	}
	return config;
};
