---
title: webpack2 react-router4 懒加载
---

版本号：
1. react-router：4.1.1
2. react-router-dom：4.1.1
3. [bundle-loader：0.5.5 (关键是这个插件)](https://github.com/webpack-contrib/bundle-loader)
4. webpack: 2.5.1

## Bundle.js 按需加载控制

~~~

/*
 *  代码分割模型，调用该模型的方式如下。
 *  name=[name]：文件名
 *  ../page/Profile:文件路径
 *  lazy：启用懒加载
 *  import SearchContainer from 'bundle-loader?lazy&name=[name]!../page/Profile';
 *
 *  const Search = () => (
 *      <Bundle load={ProfileContainer}>
 *          {(Profile) => <Profile />}
 *      </Bundle>
 *  )
 */
import React, { Component } from 'react'


class Bundle extends Component {

    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        })
        props.load((mod) => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            })
        })
    }

    render() {
        if (!this.state.mod) return false;
        return this.props.children(this.state.mod)
    }
}

export default Bundle;


~~~


## Route.js 路由配置文件

~~~

import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// bundle模型用来异步加载组件
import Bundle from './bundle.js';
//同步引入
import Home from '../page/Home'
// 异步引入
import ProfileContainer from 'bundle-loader?lazy&name=[name]!../page/Profile';


const Profile = () => (
    <Bundle load={ProfileContainer} >
        {(Profile) => <Profile />}
    </Bundle>
)

const RouteConfig = (
    <Router>
        <Route render={({...props})=> {
            return (<ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                <div key={props.location.pathname}>
                    <Route exact path="/" component={Home}/>
                    <Route  path="/profile"  component={Profile} />
                </div>
            </ReactCSSTransitionGroup>)
        }}/>

    </Router>
)

export default RouteConfig;

~~~


## webpack.config.dev.js 配置文件

~~~
module.exports = {
    output: {
        //要加上这个
        chunkFilename: 'js/[name].[chunkhash:5].min.js',
    }
 }


~~~


Note:由于这种配置时组件获取不到路由属性所以在组件需要获取路由属性时，请使用 import { withRouter } from 'react-router'

## example Profile组件：

~~~
/**
 * Created by potato on 2017/4/28.
 */

import React, {
    Component
} from 'react';
import { withRouter } from 'react-router';//关键是这个包

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Profile 组件 DEMO
            </div>
        )
    }
}

export default withRouter(Profile);
~~~
