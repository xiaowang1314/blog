---
title: 原生js操作类名的添加、移除、切换
categories: js
tags: ['js','html']
---
废话不多说直接上代码
## 代码:

``` bash
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport"content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <title>类名加、减、切换</title>
    <style>
        .btn1{color: #00AA88;}
        .btn2{color: yellow;}
        .btn3{color: red;}
    </style>
</head>
<body>
<a id="btn" href="#" class="btn1 btn2 btn3">Test</a>
<script>
    //类名加、移除、切换
    var CName={
        /**
         * H5 API classList是否存在
         * */
        hasClassList:function () {
            return ('classList' in document.documentElement);
        },
        /**
         * 用于匹配类名存在与否
         * @param name 类名
         * @returns {RegExp}
         */
        reg:function (name) {
            return new RegExp("(\\s|^)"+name+"(\\s+|$)");
        },
        /**
         * 类名是否存在
         * @param obj 元素对象
         * @param name 类名
         * @returns {boolean}
         */
        hasClass:function (obj,name) {
            if(this.hasClassList()){
               return obj.classList.contains(name);
            }
            return this.reg(name).test(obj.className);
        },
        /**
         * 加类名
         * @param obj 元素对象
         * @param name 类名
         */
        addClass:function (obj,name) {
            if(this.hasClassList()){
                obj.classList.add(name);
                return;
            }
            if(!this.hasClass(obj,name)){
               obj.className=obj.className+" "+name;
            }
        },
        /**
         * 移除类名
         * @param obj 元素对象
         * @param name 类名
         */
        removeClass:function (obj,name) {
            if(this.hasClassList()){
                obj.classList.remove(name);
                return;
            }
            if(this.hasClass(obj,name)){
                obj.className=obj.className.replace(this.reg(name)," ");
            }
        },
        /**
         *类名切换(存在则移除不存在则添加)
         * @param obj 元素对象
         * @param name 类名
         */
        toggleClass:function (obj,name) {
            if(this.hasClassList()){
                obj.classList.toggle(name);
                return;
            }
            this.hasClass(obj,name) ? this.removeClass(obj,name) : this.addClass(obj,name);
        }
    }
    var obj=document.getElementById('btn');
    //   console.log(CName.hasClassList());
    CName.removeClass(obj,'btn3');
//    CName.addClass(obj,'btn3');
//    CName.toggleClass(obj,'btn3');

</script>
</body>
</html>


```