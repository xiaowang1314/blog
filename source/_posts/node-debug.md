---
title: Node.js 热部署加debug模式
---

## 步骤

···

Debugging with node.js

1- install supervisor: sudo npm install -g supervisor
2- install node-inspector: sudo npm install node-inspector
3- On a terminal: supervisor --debug app.js
4- On another terminal: node-isnpector
5- Open Google Chrome on http://127.0.0.1:8080/debug?port=5858 and there you are a nice Developer tools to debug ;

···

### Debug图片示例

![Node.js Debug](https://raw.githubusercontent.com/xiaowang1314/blog/master/img/node-debug.png)