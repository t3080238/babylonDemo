const path = require('path');
const bs = require('browser-sync').create();
// const spa = require('browser-sync-spa');
// const htmlInjector = require('bs-html-injector');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const bundler = webpack(webpackConfig);

// bs.use(spa());
// bs.use(htmlInjector);

const middlewareList = [
    webpackDevMiddleware(bundler, {
        publicPath: '/',
        stats: {
            cached: false,
            colors: true,
            errorDetails: true
        },
        noInfo: true
    }),
    webpackHotMiddleware(bundler)
];

bs.init({
    port: 4000,
    server: {
        baseDir: path.resolve(__dirname),
        middleware: middlewareList
    },
    files: [
        `${path.resolve(__dirname)}/**/*.*`
    ],
    // ignore: [
    //     `${path.resolve(__dirname)}/**/release.json`
    // ],
    // serveStatic: ['./' + process.env.GAME_TYPE],
    // logPrefix: 'Pixi.js',
    logConnections: true
});

// var webpack = require('webpack')
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// var config = require('./webpack.config.js')

// var app = new (require('express'))();
// var port = 4000;
// var host = '0.0.0.0';

// var compiler = webpack(config)

// app.use(webpackDevMiddleware(compiler, {
//     // publicPath:config.output.publicPath
//     publicPath: '/',
//     stats: {
//         cached: false,
//         colors: true,
//         errorDetails: true
//     },
//     noInfo: true
// }))

// app.use(webpackHotMiddleware(compiler))

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + '/index.html')
// })

// app.listen(port, host, function (error) {
//     if (error) {
//         console.error(error)
//     } else {
//         console.info("react伺服器已啟動在port %s。 請打開 http://%s:%s/ 觀看", port, host, port)
//     }
// })
