---
title: webpack2 react-router2 懒加载
---

版本号：
1. react-router：2.8.1
2. webpack: 2.5.1


## Route.js 路由配置文件

~~~
import React, {
    Component
} from 'react';
import store from '../Config/Store';
import {
    Router,
    Route,
    Redirect,
    IndexRoute,
    browserHistory,
    hashHistory
} from 'react-router';
import {
    CSSTransitionGroup
} from 'react-transition-group';


class Roots extends Component {
    render() {
        return (
            <CSSTransitionGroup transitionName="example"  transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                <div key={this.props.location.pathname}>
                    {this.props.children}
                </div>
            </CSSTransitionGroup>
        );
    }
}

//首页
const Home = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../page/Home').default)
    }, 'Home')
};

//个人信息
const DpsProfile = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../page/DpsProfile').default)
    }, 'DpsProfile')
};



var history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
const RouteConfig = (
    <Router history={history}>
        <Route path="/"   component={Roots}>
            <IndexRoute getComponent={Home}/>
            {/*个人信息*/}
            <Route path="/profile" getComponent={Profile} />
        </Route>
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


