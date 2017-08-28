const path = require('path')
const webpack = require('webpack')
const vuxLoader = require('vux-loader')

let webpackConfig = {
	entry: {
		app: ['./www/boot'],
	},
	output: {
		path: path.join(__dirname,'./www/dist'),
		filename: '[name].bundle.js',
		publicPath: 'www/dist/',
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						js: 'babel-loader'
					},
					postcss: [
						require('autoprefixer')({
							browsers: ['iOS >= 7', 'Android >= 4.1']
						})
					]
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: path.join(__dirname, './node_modules')
			},
			{
				test: /\.(png|jpg|gif|ttf|eot|woff)$/,
				loader: 'file-loader?name=[name].[hash].[ext]'
			},
			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			},
		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue': 'vue/dist/vue.min.js'
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'progress.env.NODE_ENV': JSON.stringify('develop')
		})
	],
	devServer: {
		inline: true,
		hot: true,
		host: '192.168.31.125',
		port: 92,
		contentBase: './www',
		proxy: {
			'/api': {
				target: 'http://192.168.31.125:91',
				secure: false,
				pathRewrite: {'^/api' : '/'},
        changeOrigin: true
			}
		}
	},
}

module.exports = vuxLoader.merge(webpackConfig,{
	plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
})