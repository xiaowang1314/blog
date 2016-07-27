---
title: Github+Hexo绑定自己的域名
---

在github中，我们可以通过github page创建个人主页并绑定自己的域名。

据说有300m空间和无限流量，默认支持html静态页面，如果要支持动态语言需要额外的一些操作。

简单说一下怎么绑定自己的域名，不使用github的二级域名。

## 方法/步骤

+ github上创建项目的创库（怎么建仓库自己google吧！）

+ 点击"Settings"按钮进入新页面，再点击 "Launch automatic page generator" 按钮，
进入新页面后再点击"Continue to layout"按钮，进入新页面，
选择一个模板点击“publish”按钮后会在项目中创建新分支"gh-pages"

+ 在本地仓库的根目录添加CNAME，里面的内容为域名不要http以及www等前缀，只需写入域名本身，例如

``` bash
wzh6.com
```
 **\* 如果是直接在GitHub网页上添加文件的话，会遇到一个问题就是在通过`hexo g -d`之后hexo会把根目录下的CNAME文件删除。**

 所以要把CNAME文件添加到/source目录下，这样hexo g -d之后hexo会自动把CNAME复制到/puclic目录下然后将/public路径下的内容进行复制并push到远程master分支的根目录下。

+ 运行CMD，输入ping命令ping username.github.io   (其中username替换为你的github用户名)得到一个IP地址，记录下该IP地址。

+ 登录或注册[万维网](https://wanwang.aliyun.com/?utm_medium=text&utm_source=baidu&utm_campaign=ymsj&utm_content=se_3734)，添加域名，点击域名下“添加记录”按钮，分别添加@和www的两个A记录，其中IP地址填写上一步中得到的IP地址。
![](http://i2.piimg.com/4851/10255c02c3794268.png)