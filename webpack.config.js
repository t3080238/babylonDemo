const path = require('path');
const { config } = require('process');
const webpack = require("webpack");

module.exports = { //webpack起始設定
    // entry: './src/index.ts',
    context: __dirname + '/src',
    entry: {
        app: path.resolve('./src/index.ts'), //入口文件
        // vendor: [

        // ]
    },
    output: { //出口文件
        path: path.resolve(__dirname, 'dist'), // 打包後儲存的目錄
        // path: __dirname + '/',
        filename: 'bundle.js', //打包後的js檔名    filename: '[name].js' //出口文件，[name]為入口文件陣列的名稱main喔！
        publicPath: '/src/'
    },
    mode: 'production',
    module: {
        rules: [ //各類型檔案配置規則
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, 'src'), // 精確指定要處理的目錄
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env']
                    // }
                }
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                // include: path.resolve(__dirname, 'src'),
                options: {
                    onlyCompileBundledFiles: true
                }
            },
            //以pug為例的設定方式
            // {
            //     test: /\.pug$/,  //判斷.pug檔案
            //     use: ['html-loader', 'pug-html-loader'] //使用html-loader以及pug-html-loader來編譯檔案
            // },

        ]
    },
    resolve: { //配置索引，縮短webpack的解析時間，提升打包速度
        modules: [path.resolve(__dirname), 'node_modules'],
        extensions: ['.js', '.json', '.ts'],
        // alias: {
        //     commonJs: path.resolve(__dirname, 'common/js'),
        //     projectJs: path.resolve(__dirname, `${gameType}`)
        // }
    },
    // resolveLoader: { //用來判斷webpack Loader的resolve配置
    //     extensions: ['.js', '.vue', '.styl'],
    // },
    plugins: [ //Loader無法處理的部分由plugins來解決
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'js/vendor.js'
        // }),
        // new HtmlWebpackPlugin({
        //     template: `./src/${name}.pug`, //pug的檔案位置
        //     filename: `${name}.html`, //打包後轉換的檔案名稱與副檔名
        // }),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: path.resolve(__dirname, 'common/index.jade'),
        //     hash: true
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compressor: {
        //         warnings: false,
        //     },
        // }),
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // 提供hot reload功能
        new webpack.HotModuleReplacementPlugin(),
        // 當程式碼有錯誤時，不更新畫面，如果錯誤被修正才會hot reload
        // 這個可以選擇使用。
        // new webpack.NoErrorsPlugin()
    ]

};
