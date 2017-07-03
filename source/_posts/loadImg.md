---
title: 按顺序加载图片
categories: js
tags: ['js']
---

### 使用场景:
在那些需要在所有图片加载完后再执行后续函数时使用
比如我之前遇到的场景：
* 上传多张图片，等所有图片上传完后再把获取到的图片地址ajax提交表单到后台
* canvas使用时按顺序绘制图片，不然会出现层级关系问题

``` bash

/***
 *
 * 按顺序加载图片
 *
 */
 var arr=['img/1.png','img/2.png','img/3.png','img/4.png'];
 var test=arr.slice();//数组copy防止直接操作原数组
 function loadImg() {//递归方法
     if(test.length==0){
         console.log('end');
         return;
     }
     var img=new Image();
     img.onload=function () {
         console.log(this.src);
         loadImg();
     }
     img.src=test.shift();
 }

 loadImg();
 
```