---
title: webpack2 配置
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
    "css-loader": "^0.28.3",
    "extract-text-webpack-plugin": "^2.1.0",
    "file-loader": "^0.9.0",
    "happypack": "^3.0.3",
    "html-webpack-plugin": "^2.28.0",
    "less": "^2.7.2",
    "less-loader": "^4.0.3",
    "mocha": "^3.3.0",
    "mockjs": "^1.0.0",
    "postcss-import": "^10.0.0",
    "postcss-loader": "^2.0.5",
    "react-hot-loader": "^1.3.1",
    "style-loader": "^0.18.1",
    "url-loader": "^0.5.7",
    "webpack": "^2.6.1",
    "webpack-dev-server": "^2.4.5",
    "webpack-parallel-uglify-plugin": "^0.4.1"
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
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.dev");

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
    proxy: { // proxy URLs to backend development server
        '/wx': 'http://wx.test.com'
    },
    publicPath: webpackConfig.output.publicPath,//服务器资源路径
    disableHostCheck: true,
    stats: {
        colors: true
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
var p = path.resolve(__dirname + '/assets');


//入口文件
var entry = {
    app: './src/App.js',
    vendors: [
        'react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-thunk', 'react-transition-group','prop-types',
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
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.css|less$/,
            exclude: /^node_modules$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ['css-loader','postcss-loader','less-loader']
            })
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'happypack/loader?id=happybabel',
            }]
        }, {
            test: /\.(png|jpg|jpeg)$/i,
            exclude: /^node_modules$/,
            //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片(只能是相对路径图片编码background:url(../img/file.png))
            use: ['url-loader?limit=81920&name=img/[hash:8].[name].[ext]']
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            use: ['file-loader?name=[name].[ext]']
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }), //css单独打包
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: 'index.html', //生成的html存放路径，相对于 path
            template: './src/template/index.html', //html模板路径
            hash: true, //为静态资源生成hash值
        }),
        //多线程处理文件
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory=true,compact=false,presets[]=es2015,presets[]=stage-0,presets[]=react'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换(HMR)
        new webpack.NamedModulesPlugin(),
        // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendors.js'
        }) //所有公用js文件打包到vendors.js
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less', ".json"],
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        alias: {
            'react': path.resolve(__dirname + '/node_modules/react'),
            'react-dom': path.resolve(__dirname + '/node_modules/react-dom'),
            'react-router': path.resolve(__dirname + '/node_modules/react-router'),
            'react-redux': path.resolve(__dirname + '/node_modules/react-redux'),
            'redux': path.resolve(__dirname + '/node_modules/redux'),
            'redux-thunk': path.resolve(__dirname + '/node_modules/redux-thunk'),
            'react-transition-group': path.resolve(__dirname + '/node_modules/react-transition-group'),
            'prop-types': path.resolve(__dirname + '/node_modules/prop-types'),
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
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');//js压缩
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

// var liveUrl = "http://potato.ittun.com";
var liveUrl = "";
var publicPath = liveUrl + '/assets/'; //服务器路径
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
    module:{
        rules:[
            {
                test: /\.css|less$/,
                exclude: /^node_modules$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['happypack/loader?id=less']
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'happypack/loader?id=happybabel',
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg)$/i,
                exclude: /^node_modules$/,
                //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片(只能是相对路径图片编码background:url(../img/file.png))
                use:['url-loader?limit=81920&name=img/[hash:8].[name].[ext]']
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                use:['file-loader?name=[name].[ext]']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ //编译成生产版本
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        //多线程处理文件
        new HappyPack({
            id: 'less',
            loaders: ['css-loader!postcss-loader!less-loader'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory=true,compact=false,presets[]=es2015,presets[]=stage-0,presets[]=react'],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: 'index.html', //生成的html存放路径，相对于 path
            template: './src/template/index.html', //html模板路径
            hash: true,
            //为静态资源生成hash值
        }),
        new ExtractTextPlugin({
            filename:'css/[name].css'
        }), //css单独打包
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendors',
            filename:'js/vendors.js'
        }), //所有公用js文件打包到vendors.js

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

    ],
    resolve: {
        extensions: [ '.js', '.jsx','.css','.less',".json"],
        modules: [path.resolve(__dirname, "src"), "node_modules"],
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