import path from 'path';
import webpack from 'webpack';

export default {
	devtools: 'eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		path.join(__dirname, '/client/index.js')
	],
	output: {
		path: '/',
		publicPath: '/'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: [
					path.join(__dirname, 'client'),
					path.join(__dirname, 'server/shared')
				],
				loaders: [ 'react-hot', 'babel' ]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
			}
		]
	},
	resolve: {
		extensions: [ '', '.js' ]
	}
}