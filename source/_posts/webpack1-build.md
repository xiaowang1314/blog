---
title: webpack1 配置
categories: webpack1
tags: ['webpack1']
---

主要用于webpack react项目配置

## package.json

```
{
  "name": "stylist-subscription-account",
  "version": "1.0.0",
  "description": "",
  "main": "App.js",
  "repository ": "",
  "scripts": {
    "dev": "node server.js",
    "product": "webpack --config webpack.config.pro.js --progress --colors"
  },
  "author": "potato",
  "license": "ISC",
  "devDependencies": {
    "autoprefixer-loader": "^3.2.0",
    "babel-core": "^6.14.0",
    "babel-loader": "^6.2.5",
    "babel-polyfill": "^6.23.0",
    "babel-preset-es2015": "^6.14.0",
    "babel-preset-react": "^6.11.1",
    "babel-preset-stage-0": "^6.22.0",
    "chai": "^3.5.0",
    "css-loader": "^0.24.0",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.9.0",
    "happypack": "^3.0.3",
    "html-webpack-plugin": "^2.24.1",
    "less": "^2.7.1",
    "less-loader": "^2.2.3",
    "mocha": "^3.3.0",
    "mockjs": "^1.0.0",
    "postcss-import": "^10.0.0",
    "postcss-loader": "^1.3.3",
    "react-hot-loader": "^1.3.1",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "webpack": "^1.14.0",
    "webpack-dev-server": "^1.15.0",
    "webpack-parallel-uglify-plugin": "^0.4.1",
    "webpack-uglify-parallel": "^0.1.3"
  },
  "dependencies": {
    "classnames": "^2.2.5",
    "isomorphic-fetch": "^2.2.1",
    "obj-merged": "^1.0.5",
    "react": "^15.3.1",
    "react-addons-css-transition-group": "^15.4.1",
    "react-dom": "^15.3.1",
    "react-redux": "^4.4.5",
    "react-router": "^2.8.1",
    "react-slick": "^0.14.5",
    "redux": "^3.6.0",
    "redux-logger": "^2.6.1",
    "redux-thunk": "^2.1.0",
    "swiper": "^3.4.2"
  }
}


```


## server.js  开发配置

```

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

// 设置代理
var proxy = {
    '/wx/*': {
            target:'http://wx.test.com',
            // target: 'http://192.168.0.101:8080',
            secure: false
        }
}

//启动服务
var server = new WebpackDevServer(webpack(config), {
    publicPath:config.output.publicPath,//服务器资源路径
    disableHostCheck: true,
    proxy: proxy,
    stats: {
        colors: require('supports-color')
    }
});

//将其他路由，全部返回index.html
server.app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');//dev version
    // res.sendFile(__dirname + '/assets/index.html');//live version
});

server.listen(9000);

```

## webpack.config.dev.js 开发配置

```

/**
 * css、js打包成独立文件
 * @type {webpack}
 */
var os = require('os');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});


var publicPath = '/assets/'; //服务器路径
// var path = __dirname + '/assets/';
var p = path.resolve(__dirname + '/assets');


var devTool = 'source-map';
//入口文件
var entry = {
    app: './src/App.js',
    vendors: [
        'react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-thunk', 'react-addons-css-transition-group',
        'obj-merged', 'classnames', 'swiper',
        'webpack-dev-server/client?http://0.0.0.0:9000', 'webpack/hot/only-dev-server'
    ]
};


module.exports = {
    entry: entry,
    output: {
        publicPath: publicPath,
        path: p,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].[chunkhash:5].min.js',
    },
    devtool: devTool,
    module: {
        loaders: [{
                test: /\.css|less$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss-loader!less')

            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg|jpeg)$/i,
                exclude: /^node_modules$/,
                loader: 'url?limit=81920&name=img/[hash:8].[name].[ext]'
                    //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片(只能是相对路径图片编码background:url(../img/file.png))
            }, {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                // loaders: ['react-hot', 'babel?compact=false,presets[]=es2015,presets[]=stage-0,presets[]=react']
                loaders: ['happypack/loader?id=happybabel'],
            }

        ]

    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'), //css单独打包
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: 'index.html', //生成的html存放路径，相对于 path
            template: './src/template/index.html', //html模板路径
            hash: true,
              //为静态资源生成hash值
        }),

        new HappyPack({
            id: 'happybabel',
            loaders: ['react-hot', 'babel?cacheDirectory=true,compact=false,presets[]=es2015,presets[]=stage-0,presets[]=react'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
        new webpack.HotModuleReplacementPlugin(), //热替换
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js') //所有公用js文件打包到vendors.js
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: path.resolve(__dirname, 'src'),
        modulesDirectories: ['node_modules'],
        alias: {
            'react': path.resolve(__dirname + '/node_modules/react'),
            'react-dom': path.resolve(__dirname + '/node_modules/react-dom'),
            'react-router': path.resolve(__dirname + '/node_modules/react-router'),
            'react-redux': path.resolve(__dirname + '/node_modules/react-redux'),
            'redux': path.resolve(__dirname + '/node_modules/redux'),
            'redux-thunk': path.resolve(__dirname + '/node_modules/redux-thunk'),
            'react-addons-css-transition-group': path.resolve(__dirname + '/node_modules/react-addons-css-transition-group'),
            'obj-merged': path.resolve(__dirname + '/node_modules/obj-merged'),
            'classnames': path.resolve(__dirname + '/node_modules/classnames'),
            'swiper': path.resolve(__dirname + '/node_modules/swiper'),
        }
    }
}

```

## webpack.config.pro.js  生产配置

```
/**
 * css、js打包成独立文件
 * @type {webpack}
 */
var os = require('os');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

// var liveUrl = "http://potato.ittun.com";
var liveUrl = "";
var publicPath = liveUrl + '/assets/'; //服务器路径
// var p = __dirname + '/assets/';
var p = path.resolve(__dirname + '/assets');

//入口文件
var entry = {
    app: './src/App.js',
    vendors: ['react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-thunk', 'react-addons-css-transition-group', 'obj-merged', 'classnames', 'swiper']
};

module.exports = {
    entry: entry,
    output: {
        publicPath: publicPath,
        path: p,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].[chunkhash:5].min.js',
    },
    module: {
        loaders: [{
                test: /\.css|less$/,
                exclude: /^node_modules$/,
                // loader: ExtractTextPlugin.extract('style','css!postcss-loader!less')
                loader: ExtractTextPlugin.extract('style', 'happypack/loader?id=less')
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg|jpeg)$/i,
                exclude: /^node_modules$/,
                loader: 'url?limit=81920&name=img/[hash:8].[name].[ext]'
                    //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片(只能是相对路径图片编码background:url(../img/file.png))
            }, {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                // loaders: ['babel?compact=false,presets[]=es2015,presets[]=stage-0,presets[]=react']
                loaders: ['happypack/loader?id=happybabel'],
            }

        ]

    },
    plugins: [
        new webpack.DefinePlugin({ //编译成生产版本
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('css/[name].css'), //css单独打包
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: 'index.html', //生成的html存放路径，相对于 path
            template: './src/template/index.html', //html模板路径
            hash: true,
              //为静态资源生成hash值
        }),
        //多线程处理文件
        new HappyPack({
            id: 'less',
            loaders: ['css!postcss!less'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel?cacheDirectory=true,compact=false,presets[]=es2015,presets[]=stage-0,presets[]=react'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
        //多线程压缩
        new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            uglifyJS: {
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'), //所有公用js文件打包到vendors.js

    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: path.resolve(__dirname, 'src'),
        modulesDirectories: ['node_modules'],
        alias: {
            'react': path.resolve(__dirname + '/node_modules/react'),
            'react-dom': path.resolve(__dirname + '/node_modules/react-dom'),
            'react-router': path.resolve(__dirname + '/node_modules/react-router'),
            'react-redux': path.resolve(__dirname + '/node_modules/react-redux'),
            'redux': path.resolve(__dirname + '/node_modules/redux'),
            'redux-thunk': path.resolve(__dirname + '/node_modules/redux-thunk'),
            'react-addons-css-transition-group': path.resolve(__dirname + '/node_modules/react-addons-css-transition-group'),
            'obj-merged': path.resolve(__dirname + '/node_modules/obj-merged'),
            'classnames': path.resolve(__dirname + '/node_modules/classnames'),
            'swiper': path.resolve(__dirname + '/node_modules/swiper'),
        }
    }
}

```


## postcss.config.js

```

module.exports = {
	plugins: {
		'autoprefixer': {},
	}
};

```




